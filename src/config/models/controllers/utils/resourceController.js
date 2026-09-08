const { ObjectId } = require("mongodb");

const getCollection = (req, collectionName) => req.app.locals.db.collection(collectionName);

const toObjectId = (id) => (ObjectId.isValid(id) ? new ObjectId(id) : null);

const createResourceController = ({ collectionName, requiredFields = [], allowedFields }) => ({
    list: async (req, res) => {
        const filter = {};

        for (const field of allowedFields) {
            if (req.query[field]) filter[field] = req.query[field];
        }

        const records = await getCollection(req, collectionName)
            .find(filter)
            .sort({ createdAt: -1 })
            .toArray();

        res.json(records);
    },

    getById: async (req, res) => {
        const id = toObjectId(req.params.id);
        if (!id) return res.status(400).json({ message: "Invalid resource id" });

        const record = await getCollection(req, collectionName).findOne({ _id: id });
        if (!record) return res.status(404).json({ message: "Resource not found" });

        res.json(record);
    },

    create: async (req, res) => {
        const missing = requiredFields.filter((field) => !req.body[field]);
        if (missing.length) {
            return res.status(400).json({ message: `Missing required fields: ${missing.join(", ")}` });
        }

        const record = Object.fromEntries(
            allowedFields
                .filter((field) => req.body[field] !== undefined)
                .map((field) => [field, req.body[field]])
        );
        record.createdAt = new Date();
        record.updatedAt = new Date();

        const result = await getCollection(req, collectionName).insertOne(record);
        res.status(201).json({ ...record, _id: result.insertedId });
    },

    update: async (req, res) => {
        const id = toObjectId(req.params.id);
        if (!id) return res.status(400).json({ message: "Invalid resource id" });

        const updates = Object.fromEntries(
            allowedFields
                .filter((field) => req.body[field] !== undefined)
                .map((field) => [field, req.body[field]])
        );
        if (!Object.keys(updates).length) {
            return res.status(400).json({ message: "At least one field is required" });
        }
        updates.updatedAt = new Date();

        const result = await getCollection(req, collectionName).findOneAndUpdate(
            { _id: id },
            { $set: updates },
            { returnDocument: "after" }
        );
        if (!result) return res.status(404).json({ message: "Resource not found" });

        res.json(result);
    },

    remove: async (req, res) => {
        const id = toObjectId(req.params.id);
        if (!id) return res.status(400).json({ message: "Invalid resource id" });

        const result = await getCollection(req, collectionName).deleteOne({ _id: id });
        if (!result.deletedCount) return res.status(404).json({ message: "Resource not found" });

        res.status(204).send();
    }
});

module.exports = { createResourceController, getCollection, toObjectId };