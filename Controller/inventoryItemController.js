const { ObjectId } = require('mongodb');

//-------------------------------------------------
// --------- GET INVENTORY ITEM FROM CONTROLLER -------------
//-------------------------------------------------
const getInventoryItems = (db) => async (req, res) => {
  try {
    const report = await db.collection("inventoryitems").find().toArray();
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({
      message: "failed to load",
      error: error.message
    });
  }
};

//-------------------------------------------------
// --------- GET SINGLE ITEM FROM CONTROLLER ------
//-------------------------------------------------
const getInventoryItem = (db) => async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid item_id"
      });
    }
    const item = await db.collection("inventoryitems").findOne({ _id: new ObjectId(id) });

    if (!item) {
      return res.status(404).json({
        message: "item not found"
      });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({
      message: "failed to load",
      error: error.message
    });
  }
};

//-------------------------------------------------
// --------- ADD ITEM FROM CONTROLLER -------------
//-------------------------------------------------
const addInventoryItem = (db) => async (req, res) => {
  try {
    const inventoryItem = req.body;

    if (!Array.isArray(inventoryItem)) {
      return res.status(400).json({
        message: "Request body must be an array of inventory item"
      });
    }

    const add = await db.collection("inventoryitems").insertMany(inventoryItem);
    res.status(201).json(add);
  } catch (error) {
    res.status(500).json({
      message: "failed to add inventory item",
      error: error.message
    });
  }
};

//-------------------------------------------------
// --------- UPDATING INVENTORY ITEM FROM CONTROLLER --------
//-------------------------------------------------
const updateInventoryItem = (db) => async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "invalid id"
      });
    }

    const update = await db.collection("inventoryitems").updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );

    if (update.matchedCount === 0) {
      return res.status(404).json({
        message: "item not found"
      });
    }
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({
      message: "failed to update",
      error: error.message
    });
  }
};

//-------------------------------------------------
// --------- DELETE INVENTORY ITEM FROM CONTROLLER ----------
//-------------------------------------------------
const deletInventoryItem = (db) => async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "invalid item_id"
      });
    }

    const del = await db.collection("inventoryitems").deleteOne({ _id: new ObjectId(id) });

    if (del.deletedCount === 0) {
      return res.status(404).json({
        message: "Item not found"
      });
    }
    res.status(200).json(del);
  } catch (error) {
    res.status(500).json({
      message: "failed to delete",
      error: error.message
    });
  }
};

module.exports = {
  getInventoryItems,
  getInventoryItem,
  addInventoryItem,
  updateInventoryItem,
  deletInventoryItem
};