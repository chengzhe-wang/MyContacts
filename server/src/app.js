const express = require("express");
const bodyParser = require("body-parser");
const server = require("./server");

//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

//routes
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");


const app = express();
app.use(bodyParser.json());

server.startMongo().catch(console.error);

app.use("/auth", userRoutes);
app.use("/contacts", contactRoutes);

app.listen(3000, () => 
  console.log("Server running on http://localhost:3000")
);


const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MyContacts API",
      version: "1.0.0",
      description: "Documentation de l'API MyContacts avec Express + MongoDB",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));