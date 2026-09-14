const { ObjectId } = require('mongodb');

//-------------------------------------------------
// --------- GET USER FROM CONTROLLER -------------
//-------------------------------------------------
const getusers = (db) => async (req, res) => {
  try {
    const user = await db.collection("user").find().toArray();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "failed to load",
      error: error.message
    });
  }
};

//-------------------------------------------------
// --------- GET SINGLE USER FROM CONTROLLER ------
//-------------------------------------------------
const getuser = (db) => async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid user_id"
      });
    }
    const user1 = await db.collection("user").findOne({ _id: new ObjectId(id) });

    if (!user1) {
      return res.status(404).json({
        message: "user not found"
      });
    }
    res.status(200).json(user1);
  } catch (error) {
    res.status(500).json({
      message: "failed to load",
      error: error.message
    });
  }
};

//-------------------------------------------------
// --------- ADD USER FROM CONTROLLER -------------
//-------------------------------------------------
const adduser = (db) => async (req, res) => {
  try {
    const user = req.body;

    if (!Array.isArray(user)) {
      return res.status(400).json({
        message: "Request body must be an array of users"
      });
    }

    const add = await db.collection("user").insertMany(user);
    res.status(201).json(add);
  } catch (error) {
    res.status(500).json({
      message: "failed to add user",
      error: error.message
    });
  }
};

//-------------------------------------------------
// --------- UPDATING USER FROM CONTROLLER --------
//-------------------------------------------------
const updateuser = (db) => async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "invalid id"
      });
    }

    const update = await db.collection("user").updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );

    if (update.matchedCount === 0) {
      return res.status(404).json({
        message: "user not found"
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
// --------- DELETE USER FROM CONTROLLER ----------
//-------------------------------------------------
const deletuser = (db) => async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "invalid user_id"
      });
    }

    const del = await db.collection("user").deleteOne({ _id: new ObjectId(id) });

    if (del.deletedCount === 0) {
      return res.status(404).json({
        message: "user not found"
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
  getusers,
  getuser,
  adduser,
  updateuser,
  deletuser
};