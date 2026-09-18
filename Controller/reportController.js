const { ObjectId } = require('mongodb');

//-------------------------------------------------
// --------- GET REPORT FROM CONTROLLER -------------
//-------------------------------------------------
const getreports = (db) => async (req, res) => {
  try {
    const report = await db.collection("report").find().toArray();
    res.status(200).json(report);
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
const getreport = (db) => async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid report_id"
      });
    }
    const report = await db.collection("report").findOne({ _id: new ObjectId(id) });

    if (!report) {
      return res.status(404).json({
        message: "report not found"
      });
    }
    res.status(200).json(report);
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
const addreport = (db) => async (req, res) => {
  try {
    const report = req.body;

    if (!Array.isArray(report)) {
      return res.status(400).json({
        message: "Request body must be an array of users"
      });
    }

    const add = await db.collection("report").insertMany(report);
    res.status(201).json(add);
  } catch (error) {
    res.status(500).json({
      message: "failed to add report",
      error: error.message
    });
  }
};

//-------------------------------------------------
// --------- UPDATING USER FROM CONTROLLER --------
//-------------------------------------------------
const updatereport = (db) => async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "invalid id"
      });
    }

    const update = await db.collection("report").updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );

    if (update.matchedCount === 0) {
      return res.status(404).json({
        message: "report not found"
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
const deletreport = (db) => async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "invalid report_id"
      });
    }

    const del = await db.collection("report").deleteOne({ _id: new ObjectId(id) });

    if (del.deletedCount === 0) {
      return res.status(404).json({
        message: "report not found"
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
  getreports,
  getreport,
  addreport,
  updatereport,
  deletreport
};