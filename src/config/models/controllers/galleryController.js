const { collectionName } = require("../gallery");
const { createResourceController } = require("./utils/resourceController");

module.exports = createResourceController({
	collectionName,
	requiredFields: ["title", "imageUrl"],
	allowedFields: ["title", "imageUrl", "description", "uploadedBy"]
});
