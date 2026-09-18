const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Rambura Backend API",
      version: "1.0.0",
      description:
        "REST API for managing inventory items, inventory transactions, repairs, and reports."
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server"
      }
    ],

    tags: [
      {
        name: "Inventory Items",
        description: "Inventory item management"
      },
      {
        name: "Inventory Transactions",
        description: "Inventory transaction management"
      },
      {
        name: "Repairs",
        description: "Repair management"
      },
      {
        name: "Reports",
        description: "Report management"
      }
    ],

    components: {
      schemas: {
        ObjectId: {
          type: "string",
          pattern: "^[a-fA-F0-9]{24}$",
          example: "64f123456789abcdef123456"
        },

        InventoryItem: {
          type: "object",
          description: "Inventory item stored in MongoDB.",
          properties: {
            _id: {
              $ref: "#/components/schemas/ObjectId"
            },
            name: {
              type: "string",
              example: "Laptop"
            },
            quantity: {
              type: "integer",
              example: 10
            },
            description: {
              type: "string",
              example: "School laptops"
            }
          }
        },

        InventoryTransaction: {
          type: "object",
          description: "Inventory transaction stored in MongoDB.",
          properties: {
            _id: {
              $ref: "#/components/schemas/ObjectId"
            },
            item: {
              type: "string",
              example: "Laptop"
            },
            quantity: {
              type: "integer",
              example: 2
            },
            type: {
              type: "string",
              example: "IN"
            }
          }
        },

        Repair: {
          type: "object",
          description: "Repair record stored in MongoDB.",
          properties: {
            _id: {
              $ref: "#/components/schemas/ObjectId"
            },
            item: {
              type: "string",
              example: "Laptop"
            },
            description: {
              type: "string",
              example: "Screen repair"
            },
            status: {
              type: "string",
              example: "Pending"
            }
          }
        },

        Report: {
          type: "object",
          description: "Report record stored in MongoDB.",
          properties: {
            _id: {
              $ref: "#/components/schemas/ObjectId"
            },
            title: {
              type: "string",
              example: "Monthly Inventory Report"
            },
            description: {
              type: "string",
              example: "Inventory status for September"
            }
          }
        },

        DatabaseResult: {
          type: "object",
          description: "MongoDB operation result.",
          properties: {
            acknowledged: {
              type: "boolean",
              example: true
            },
            matchedCount: {
              type: "integer",
              example: 1
            },
            modifiedCount: {
              type: "integer",
              example: 1
            },
            deletedCount: {
              type: "integer",
              example: 1
            }
          }
        },

        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Item not found"
            },
            error: {
              type: "string",
              example: "Database error"
            }
          }
        }
      }
    }
  },

  apis: ["./src/config/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;