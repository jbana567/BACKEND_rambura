const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',

    info: {
      title: 'School API',
      version: '1.0.0',
      description: 'REST API for managing The school'
    },

    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },

  // Search for Swagger comments inside the routes folder
  apis: ['./src/config/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;