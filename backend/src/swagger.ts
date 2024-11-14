// src/swagger.js
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Autenticación y Conversión de Monedas",
      version: "1.0.0",
      description: "Documentación de la API",
    },
    components: {
       securitySchemes: {
           Authorization: {
               type: "http",
               scheme: "bearer",
               bearerFormat: "JWT",
               value: "Bearer <JWT token here>"
           }
       }
   },
    servers: [
      {
        url: "http://localhost:3000/api", description: "Api de Conversion de Monedas"
      },
    ],
  },
  apis: ['**/*.ts'],
};

const swaggerUiOptions = {
  explorer: true
};


const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app : any) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));
  console.log("📄 Documentación disponible en: http://localhost:3000/api-docs");
};

export default swaggerDocs;
