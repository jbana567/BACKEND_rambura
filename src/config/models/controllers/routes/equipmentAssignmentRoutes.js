const createResourceRoutes = require("./resourceRoutes");
const equipmentAssignmentController = require("../equipmentAssignmentController");

module.exports = createResourceRoutes(equipmentAssignmentController);