const { getDB } = require('../Config/MongoConfig');
const { ObjectId } = require('mongodb');

const VideoController = {
    getVideos: async (req, res) => {
        try {
            const db = getDB();
            const course_id = req.body.course_id;
            if (!course_id) {
                return res.json({ 'status': 'failed', error: 'Course ID is required.', 'message': 'Cant get videos', 'StatusCode': 400 });
            }
            const videos = await db.collection('course_videos').find({ course_id: course_id }).toArray();
            if (videos.length === 0) {
                return res.json({ 'status': 'failed', error: 'No videos found.', 'StatusCode': 404 });
            }
            else {
                res.json({ 'status': 'success', 'data': videos, 'message': 'Videos fetched successfully.', 'StatusCode': 200 });
            }
        }
        catch (error) {
            console.error('Error fetching videos:', error);
            return res.json({ 'status': 'failed', error: 'Failed to fetch videos.', 'StatusCode': 500 });
        }
    },
    postVideo: async (req, res) => {
        try {
            const { course_id, video_title, video_description, video, video_duration } = req.body;

            if (!course_id || !video_title || !video_description || !video || !video_duration) {
                return res.json({ 'status': 'failed', error: 'All fields are required.', 'StatusCode': 400 });
            }

            const newVideo = {
                course_id,
                video_title,
                video_description,
                video,
                video_duration
            };

            const db = getDB();
            const result =await db.collection('course_videos').insertOne(newVideo);

            return res.json({
                message: 'Video added successfully.',
                video: {
                    _id: result.insertedId,
                    ...newVideo
                },
                'StatusCode': 200
            });
        } catch (error) {
            console.error('Error adding video:', error);
            return res.json({ 'status': 'failed', error: 'Failed to add video.', 'StatusCode': 500 });
        }
    },

    getVideo: async (req, res) => {
        try {
            const db = getDB();
            const videoId = req.params.video_id;
            if (!videoId) {
                return res.json({ 'status': 'failed', error: 'Video ID is required.', 'message': 'Cant get Video', 'StatusCode': 400 });
            }
            const courseVideo = await db.collection('course_videos').findOne({ _id: new ObjectId(videoId) });
            if (!courseVideo) {
                return res.json({ 'status': 'failed', error: 'Video not found.', 'StatusCode': 404 });
            }
            res.json({ 'status': 'success', 'data': courseVideo, 'message': 'Video fetched successfully.', 'StatusCode': 200 });
        } catch (error) {
            console.error('Error fetching Video:', error);
            return res.json({ 'status': 'failed', error: 'Failed to fetch Video.', 'StatusCode': 500 })
        }
    },

    deleteVideo: async (req, res) => {
        try {
            const db = getDB();
            const videoId = req.params.video_id;
            if (!videoId) {
                return res.json({ 'status': 'failed', error: 'Video ID is required.', 'message': 'Cant get video', 'StatusCode': 400 });
            }
            const findvideo = await db.collection('course_videos').findOne({ _id: new ObjectId(videoId) });
            if (!findvideo) {
                return res.json({ 'status': 'failed', error: 'Video not found.', 'StatusCode': 404 });
            }
            else {
                const video = await db.collection('course_videos').deleteOne({ _id: new ObjectId(videoId) });
                if (!video) {
                    return res.json({ 'status': 'failed', error: 'Video not found.', 'StatusCode': 404 });
                }
                else {
                    res.json({ 'status': 'success', 'message': 'Video deleted successfully.', 'StatusCode': 200 });
                }
            }
        } catch (error) {
            console.error('Error deleting video:', error);
            return res.json({ 'status': 'failed', error: 'Failed to delete video.', 'StatusCode': 500 })
        }
    }
}

module.exports = VideoController;