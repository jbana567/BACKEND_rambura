const { collectionName } = require("../websitepage");
const { createResourceController } = require("./utils/resourceController");

module.exports = createResourceController({
	collectionName,
	requiredFields: ["section", "title", "content"],
	allowedFields: ["section", "title", "content", "image", "status", "updatedBy"]
});
