const createResourceRoutes = require("./resourceRoutes");
const websiteController = require("../websiteController");

module.exports = createResourceRoutes(websiteController);
