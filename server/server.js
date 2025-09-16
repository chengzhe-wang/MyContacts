const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./src/routes/userRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
app.use(bodyParser.json());


app.use("/", userRoutes);

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
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));