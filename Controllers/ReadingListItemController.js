const { getDB } = require('../Config/MongoConfig');
const { ObjectId } = require('mongodb');
const ReadingListItem = require('../Models/ReadingListSingleModel');

const ReadingListItemController = {
    getAllReadingListItem: async (req, res) => {
        const db = getDB();  
        const reading_list_id = req.params.reading_list_id;
        console.log(reading_list_id);
        try {
            if (!ObjectId.isValid(reading_list_id)) {
                return res.json({ status: 'failed', error: 'Invalid Reading List ID.', StatusCode: 400 });
            }
            const readingList = await db.collection('reading_list').findOne({ _id: new ObjectId(reading_list_id) });
            if (!readingList) {
                return res.json({ status: 'failed', error: 'Reading List not found.', StatusCode: 404 });
            }

            const readingListItems = await db.collection('reading_list_items').find({ reading_list_id: new ObjectId(reading_list_id) }).toArray();

            if(readingListItems.length === 0){
                return res.json({ status: 'failed', error: 'No reading list items found.', StatusCode: 404 });
            }
            else{
                return res.json({ status: 'success', data: readingListItems, message: 'Reading List Items fetched successfully.', StatusCode: 200 });
            }
        } catch (error) {
            console.error('Error fetching reading list items:', error);
            return res.json({ status: 'failed', error: 'Failed to fetch reading list items.', StatusCode: 500 });
        }
    },
    addReadingListItem: async (req, res) => {
        const db = getDB();
        const { reading_list_id, reading_list_item_title, reading_list_item_description } = req.body;

        if (!reading_list_id || !reading_list_item_title || !reading_list_item_description) {
            return res.json({ status: 'failed', error: 'All fields are required.', StatusCode: 400 });
        }

        try {
            if (!ObjectId.isValid(reading_list_id)) {
                return res.json({ status: 'failed', error: 'Invalid Reading List ID.', StatusCode: 400 });
            }
            const readingList = await db.collection('reading_list').findOne({ _id: new ObjectId(reading_list_id) });
           
            if (!readingList) {
                return res.json({ status: 'failed', error: 'Reading List not found.', StatusCode: 404 });
            }


            const newReadingListItem = {
                reading_list_id: new ObjectId(reading_list_id),
                reading_list_item_title,
                reading_list_item_description
            };

            try{
                console.log(newReadingListItem);
                const result = await db.collection('reading_list_items').insertOne(newReadingListItem);
                return res.json({ status: 'success', message: 'Reading List Item added successfully.', StatusCode: 200 });
            }
            catch(error){
                console.error('Error adding reading list item:', error);
                return res.json({ status: 'failed', error: 'Failed to add reading list item.', StatusCode: 500 });
            }
        } catch (error) {
            console.error('Error adding reading list item:', error);
            return res.json({ status: 'failed', error: 'Failed to add reading list item.', StatusCode: 500 });
        }
    },
    getSingleReadingListItem: async (req, res) => {
        const db = getDB();  
        const reading_list_item_id = req.params.reading_list_item_id;

        try {
            if (!ObjectId.isValid(reading_list_item_id)) {
                return res.json({ status: 'failed', error: 'Invalid Reading List Item ID.', StatusCode: 400 });
            }
            const readingListItem = await db.collection('reading_list_items').findOne({ _id: new ObjectId(reading_list_item_id) });
            if (!readingListItem) {
                return res.json({ status: 'failed', error: 'Reading List Item not found.', StatusCode: 404 });
            }
            return res.json({ status: 'success', data: readingListItem, message: 'Reading List Item fetched successfully.', StatusCode: 200 });
        } catch (error) {
            console.error('Error fetching reading list item:', error);
            return res.json({ status: 'failed', error: 'Failed to fetch reading list item.', StatusCode: 500 });
        }
    },
    deleteReadingListItem: async (req, res) => {
        const db = getDB();
        const reading_list_item_id = req.params.reading_list_item_id;

        try {
            if (!ObjectId.isValid(reading_list_item_id)) {
                return res.json({ status: 'failed', error: 'Invalid Reading List Item ID.', StatusCode: 400 });
            }
            const result = await db.collection('reading_list_items').deleteOne({ _id: new ObjectId(reading_list_item_id) });
            if (result.deletedCount === 0) {
                return res.json({ status: 'failed', error: 'Reading List Item not found.', StatusCode: 404 });
            } else {
                return res.json({ status: 'success', message: 'Reading List Item deleted successfully.', StatusCode: 200 });
            }
        } catch (error) {
            console.error('Error deleting reading list item:', error);
            return res.json({ status: 'failed', error: 'Failed to delete reading list item.', StatusCode: 500 });
        }
    }
};

module.exports = ReadingListItemController;
