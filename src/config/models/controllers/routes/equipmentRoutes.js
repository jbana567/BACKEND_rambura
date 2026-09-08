const createResourceRoutes = require("./resourceRoutes");
const equipmentController = require("../equipmentController");

module.exports = createResourceRoutes(equipmentController);