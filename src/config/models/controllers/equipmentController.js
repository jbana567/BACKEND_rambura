const { collectionName } = require("../equipment");
const { createResourceController } = require("./utils/resourceController");

module.exports = createResourceController({
    collectionName,
    requiredFields: ["equipmentId", "name", "category", "location"],
    allowedFields: ["equipmentId", "name", "category", "location", "status", "purchaseDate"]
});