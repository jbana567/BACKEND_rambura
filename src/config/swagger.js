const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Rambura Garçons School Management System API",
      version: "1.0.0",
      description:
        "API documentation for the Rambura Garçons School Management System"
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },

        parameters: {
          id: {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            example: "665abc123456789012345678"
          }
        },

      schemas: {
        GalleryInput: {
          type: "object",
          required: ["title", "imageUrl"],
          properties: {
            title: { type: "string", example: "School Laboratory" },
            imageUrl: { type: "string", format: "uri", example: "https://example.com/laboratory.jpg" },
            description: { type: "string", example: "Students working in the laboratory" },
            uploadedBy: { type: "string", example: "665abc123456789012345678" }
          }
        },

        WebsiteContentInput: {
          type: "object",
          required: ["section", "title", "content"],
          properties: {
            section: { type: "string", example: "About" },
            title: { type: "string", example: "About Rambura School" },
            content: { type: "string", example: "Rambura Garcons School is a secondary school..." },
            image: { type: "string", format: "uri", example: "https://example.com/school.jpg" },
            status: { type: "string", enum: ["Draft", "Published", "Archived"], example: "Published" },
            updatedBy: { type: "string", example: "665abc123456789012345678" }
          }
        },

        EquipmentInput: {
          type: "object",
          required: ["equipmentId", "name", "category", "location"],
          properties: {
            equipmentId: { type: "string", example: "EQ-001" },
            name: { type: "string", example: "Dell Laptop" },
            category: { type: "string", example: "Computer" },
            location: { type: "string", example: "Computer Lab" },
            status: { type: "string", enum: ["Available", "Assigned", "Repair", "Retired"], example: "Available" },
            purchaseDate: { type: "string", format: "date", example: "2026-01-15" }
          }
        },

        EquipmentAssignmentInput: {
          type: "object",
          required: ["equipmentId", "userId", "assignedDate"],
          properties: {
            equipmentId: { type: "string", example: "665abc123456789012345678" },
            userId: { type: "string", example: "665abc123456789012345678" },
            assignedDate: { type: "string", format: "date", example: "2026-09-01" },
            returnedDate: { type: "string", format: "date", example: "2026-09-10" },
            status: { type: "string", enum: ["Assigned", "Returned"], example: "Assigned" }
          }
        },

        Gallery: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "665abc123456789012345678"
            },
            title: {
              type: "string",
              example: "School Laboratory"
            },
            imageUrl: {
              type: "string",
              example: "https://example.com/laboratory.jpg"
            },
            description: {
              type: "string",
              example: "Students working in the laboratory"
            },
            uploadedBy: {
              type: "string",
              example: "665abc123456789012345678"
            }
          }
        },

        WebsiteContent: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "665abc123456789012345678"
            },
            section: {
              type: "string",
              example: "About"
            },
            title: {
              type: "string",
              example: "About Rambura School"
            },
            content: {
              type: "string",
              example: "Rambura Garçons School is a secondary school..."
            },
            image: {
              type: "string",
              example: "https://example.com/school.jpg"
            },
            status: {
              type: "string",
              enum: ["Draft", "Published", "Archived"],
              example: "Published"
            },
            updatedBy: {
              type: "string",
              example: "665abc123456789012345678"
            }
          }
        },

        Equipment: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "665abc123456789012345678"
            },
            equipmentId: {
              type: "string",
              example: "EQ-001"
            },
            name: {
              type: "string",
              example: "Dell Laptop"
            },
            category: {
              type: "string",
              example: "Computer"
            },
            location: {
              type: "string",
              example: "Computer Lab"
            },
            status: {
              type: "string",
              enum: ["Available", "Assigned", "Repair", "Retired"],
              example: "Available"
            },
            purchaseDate: {
              type: "string",
              format: "date",
              example: "2026-01-15"
            }
          }
        },

        EquipmentAssignment: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "665abc123456789012345678"
            },
            equipmentId: {
              type: "string",
              example: "665abc123456789012345678"
            },
            userId: {
              type: "string",
              example: "665abc123456789012345678"
            },
            assignedDate: {
              type: "string",
              format: "date",
              example: "2026-09-01"
            },
            returnedDate: {
              type: "string",
              format: "date",
              example: "2026-09-10"
            },
            status: {
              type: "string",
              enum: ["Assigned", "Returned"],
              example: "Assigned"
            }
          }
        }
      }
    },

    paths: {
      "/api/gallery": {
        get: { summary: "List gallery items", responses: { 200: { description: "Gallery items" } } },
        post: {
          summary: "Create gallery item",
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/GalleryInput" } } } },
          responses: { 201: { description: "Gallery item created" } }
        }
      },
      "/api/gallery/{id}": {
        get: { summary: "Get gallery item", parameters: [{ $ref: "#/components/parameters/id" }], responses: { 200: { description: "Gallery item" } } },
        patch: {
          summary: "Update gallery item",
          parameters: [{ $ref: "#/components/parameters/id" }],
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/GalleryInput" } } } },
          responses: { 200: { description: "Gallery item updated" } }
        },
        delete: { summary: "Delete gallery item", parameters: [{ $ref: "#/components/parameters/id" }], responses: { 204: { description: "Gallery item deleted" } } }
      },
      "/api/website-content": {
        get: { summary: "List website content", responses: { 200: { description: "Website content" } } },
        post: {
          summary: "Create website content",
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/WebsiteContentInput" } } } },
          responses: { 201: { description: "Website content created" } }
        }
      },
      "/api/website-content/{id}": {
        get: { summary: "Get website content", parameters: [{ $ref: "#/components/parameters/id" }], responses: { 200: { description: "Website content" } } },
        patch: {
          summary: "Update website content",
          parameters: [{ $ref: "#/components/parameters/id" }],
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/WebsiteContentInput" } } } },
          responses: { 200: { description: "Website content updated" } }
        },
        delete: { summary: "Delete website content", parameters: [{ $ref: "#/components/parameters/id" }], responses: { 204: { description: "Website content deleted" } } }
      },
      "/api/equipment": {
        get: { summary: "List equipment", responses: { 200: { description: "Equipment items" } } },
        post: {
          summary: "Create equipment",
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/EquipmentInput" } } } },
          responses: { 201: { description: "Equipment created" } }
        }
      },
      "/api/equipment/{id}": {
        get: { summary: "Get equipment", parameters: [{ $ref: "#/components/parameters/id" }], responses: { 200: { description: "Equipment item" } } },
        patch: {
          summary: "Update equipment",
          parameters: [{ $ref: "#/components/parameters/id" }],
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/EquipmentInput" } } } },
          responses: { 200: { description: "Equipment updated" } }
        },
        delete: { summary: "Delete equipment", parameters: [{ $ref: "#/components/parameters/id" }], responses: { 204: { description: "Equipment deleted" } } }
      },
      "/api/equipment-assignments": {
        get: { summary: "List equipment assignments", responses: { 200: { description: "Equipment assignments" } } },
        post: {
          summary: "Assign equipment",
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/EquipmentAssignmentInput" } } } },
          responses: { 201: { description: "Equipment assigned" } }
        }
      },
      "/api/equipment-assignments/{id}": {
        get: { summary: "Get equipment assignment", parameters: [{ $ref: "#/components/parameters/id" }], responses: { 200: { description: "Equipment assignment" } } },
        patch: {
          summary: "Update equipment assignment",
          parameters: [{ $ref: "#/components/parameters/id" }],
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/EquipmentAssignmentInput" } } } },
          responses: { 200: { description: "Equipment assignment updated" } }
        },
        delete: { summary: "Delete equipment assignment", parameters: [{ $ref: "#/components/parameters/id" }], responses: { 204: { description: "Equipment assignment deleted" } } }
      }
    },

  },

  // Swagger will read these files for documentation comments
  apis: [
    "./src/config/models/controllers/routes/*.js"
  ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;