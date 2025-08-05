const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
const cors = require('cors');

dotenv.config();

const url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;
const port = 3000;

const app = express();
app.use(bodyparser.json());
app.use(cors());

async function startServer() {
    try {
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('passwords');

        // Get all passwords
        app.get('/', async (req, res) => {
            const findResult = await collection.find({}).toArray();
            res.json(findResult);
        });

        // Save a new password
        app.post('/', async (req, res) => {
            const password = req.body;
            const insertResult = await collection.insertOne(password);
            res.send({ success: true, result: insertResult });
        });

        // Update an existing password
        app.put('/', async (req, res) => {
            const { id, ...updateFields } = req.body;
            if (!id) {
                return res.status(400).send({ success: false, message: 'Missing id field for update' });
            }
            const updateResult = await collection.updateOne(
                { id },          
                { $set: updateFields } 
            );
            res.send({ success: true, result: updateResult });
        });


        // Delete a password by id
        app.delete('/', async (req, res) => {
            const { id } = req.body;
            const deleteResult = await collection.deleteOne({ id });
            res.send({ success: true, result: deleteResult });
        });

        app.listen(port, () => {

        });
    } catch (err) {

        console.error('Failed to start server:', err);
    }
}

startServer();
