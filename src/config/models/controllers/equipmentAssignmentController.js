const { collectionName: equipmentCollection } = require("../equipment");
const { collectionName } = require("../equipmentassignment");
const { createResourceController, getCollection, toObjectId } = require("./utils/resourceController");

const controller = createResourceController({
    collectionName,
    requiredFields: ["equipmentId", "userId", "assignedDate"],
    allowedFields: ["equipmentId", "userId", "assignedDate", "returnedDate", "status"]
});

controller.create = async (req, res) => {
    const equipmentId = toObjectId(req.body.equipmentId);
    if (!equipmentId) return res.status(400).json({ message: "equipmentId must be a valid MongoDB id" });

    const missing = ["userId", "assignedDate"].filter((field) => !req.body[field]);
    if (missing.length) {
        return res.status(400).json({ message: `Missing required fields: ${missing.join(", ")}` });
    }

    const equipment = await getCollection(req, equipmentCollection).findOne({ _id: equipmentId });
    if (!equipment) return res.status(404).json({ message: "Equipment not found" });

    const assignment = {
        equipmentId,
        userId: req.body.userId,
        assignedDate: req.body.assignedDate,
        returnedDate: req.body.returnedDate,
        status: req.body.status || "Assigned",
        createdAt: new Date(),
        updatedAt: new Date()
    };
    const result = await getCollection(req, collectionName).insertOne(assignment);
    await getCollection(req, equipmentCollection).updateOne(
        { _id: equipmentId },
        { $set: { status: "Assigned", updatedAt: new Date() } }
    );

    res.status(201).json({ ...assignment, _id: result.insertedId });
};

module.exports = controller;