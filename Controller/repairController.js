
const { ObjectId } = require("mongodb");

// GET ALL REPAIRS
const getRepairs = (db) => async (req, res) => {
    try {
        const repairs = [];

        await db.collection("repair").find().forEach((element) => {
            repairs.push(element);
        });

        res.status(200).json(repairs);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get repairs",
            error: error.message
        });
    }
};

// GET ONE REPAIR
const getRepair = (db) => async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid repair ID"
            });
        }

        const repair = await db.collection("repair").findOne({
            _id: new ObjectId(id)
        });

        if (!repair) {
            return res.status(404).json({
                message: "Repair not found"
            });
        }

        res.status(200).json(repair);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get repair",
            error: error.message
        });
    }
};

// ADD REPAIR
const addRepair = (db) => async (req, res) => {
    try {
        const repair = req.body;

        if (!Array.isArray(repair)) {
            return res.status(400).json({
                message: "Request body must be an array of repairs"
            });
        }

        const result = await db.collection("repair").insertMany(repair);

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: "Failed to add repair",
            error: error.message
        });
    }
};

// UPDATE REPAIR
const updateRepair = (db) => async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid repair ID"
            });
        }

        const result = await db.collection("repair").updateOne(
            {
                _id: new ObjectId(id)
            },
            {
                $set: req.body
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Repair not found"
            });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update repair",
            error: error.message
        });
    }
};

// DELETE REPAIR
const deleteRepair = (db) => async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid repair ID"
            });
        }

        const result = await db.collection("repair").deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Repair not found"
            });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete repair",
            error: error.message
        });
    }
};

module.exports = {
    getRepairs,
    getRepair,
    addRepair,
    updateRepair,
    deleteRepair
};



