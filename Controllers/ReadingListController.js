const { getDB } = require('../Config/MongoConfig');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');


const ReadingListController = {
    getAllReadingList: async (req, res) => {
        try {
            const db = getDB();
            const readingList = await db.collection('reading_list').find().toArray();
            if (readingList.length === 0) {
                return res.status(404).json({ error: 'No reading list found.', 'StatusCode': 404 });
            }
            else {
                res.json({ 'status': 'success', 'data': readingList, 'message': 'Reading list fetched successfully.', 'StatusCode': 200 });
            }
        } catch (error) {
            console.error('Error fetching reading list:', error);
            res.json({ 'status': 'failed', error: 'Failed to fetch reading list.', 'StatusCode': 500 });
        }
    },
    
    addReadingList: async (req, res) => {
        const { reading_list_title, reading_list_description, reading_list_skills, reading_list_image, reading_list_banner } = req.body;

        if (!reading_list_title || !reading_list_description || !reading_list_skills || !reading_list_image || !reading_list_banner) {
            return res.json({ 'status': 'failed', error: 'All fields are required.', 'StatusCode': 400 });
        }
        else {
            try {
                const newReadingList = {
                    reading_list_title,
                    reading_list_description,
                    reading_list_skills,
                    reading_list_image,
                    reading_list_banner
                };
                const db = getDB();
                const result = await db.collection('reading_list').insertOne(newReadingList);
                return res.json({
                    message: 'Reading list added successfully.',
                    readingList: {
                        _id: result.insertedId,
                        ...newReadingList
                    }
                });
            }
            catch (error) {
                console.error('Error adding reading list:', error);
                res.json({ 'status': 'failed', error: 'Failed to add reading list.', 'StatusCode': 500 });
            }
        }
    },
    getSingleReadingList: async (req, res) => {
        try {
            const db = getDB();
            const reading_list_id = req.params.reading_list_id;
            const course = await db.collection('reading_list').findOne({ _id: new ObjectId(reading_list_id) });
            if (!course) {
                return res.json({ 'status': 'failed', error: 'Reading List not found.', 'StatusCode': 404 });
            }
            res.json({ 'status': 'success', 'data': course, 'message': 'Reading List fetched successfully.', 'StatusCode': 200 });
        } catch (error) {
            console.error('Error fetching Reading List:', error);
            res.json({ 'status': 'failed', error: 'Failed to fetch Reading List.', 'StatusCode': 500 })
        }
    },
    deleteReadingList:async  (req, res) => {
        try {
            const db = getDB();
            const reading_list_id = req.params.reading_list_id;
            const readingList =await db.collection('reading_list').deleteOne({ _id: new ObjectId(reading_list_id) });
            if (readingList.deletedCount === 0) {
                return res.json({ 'status': 'failed', error: 'Reading list not found.', 'StatusCode': 404 });
            }
            else{
                return res.json({ 'status': 'success', 'message': 'Reading list deleted successfully.', 'StatusCode': 200 });
            }
        }
        catch (error) {
            console.error('Error deleting reading list:', error);
            res.json({ 'status': 'failed', error: 'Failed to delete reading list.', 'StatusCode': 500 });
        }
    }
}
module.exports = ReadingListController;