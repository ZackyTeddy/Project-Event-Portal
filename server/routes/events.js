import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
import checkAuth from '../middleware/auth.js';
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
    let collection = await db.collection("event_list");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", checkAuth, async (req, res) => {
    let collection = await db.collection("event_list");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", checkAuth, async (req, res) => {
    try {
        let newDocument = {
            eventName: req.body.eventName,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            location: req.body.location,
            status: req.body.status,
            priority: req.body.priority
        };
        let collection = await db.collection("event_list");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding event item");
    }
});

// This section will help you update a record by id.
router.patch("/:id", checkAuth, async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
        $set: {
            eventName: req.body.eventName,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            location: req.body.location,
            status: req.body.status,
            priority: req.body.priority
        },
        };

        let collection = await db.collection("event_list");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating event item");
    }
});

// This section will help you delete a record
router.delete("/:id", checkAuth, async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const collection = db.collection("event_list");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting event item");
    }
});

export default router;