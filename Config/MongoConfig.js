const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const uri = process.env.MongoDB_URI;
const client = new MongoClient(uri);

let db;

const connectToDB = async () => {
    try {
        await client.connect();
        db = client.db(process.env.MongoDB_DBName);
        console.log('Connected to Mongo Database Greever');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

const getDB = () => {
    if (!db) {
        throw new Error('Database not initialized. Call connectToDB first.');
    }
    return db;
};

module.exports = { connectToDB, getDB };
