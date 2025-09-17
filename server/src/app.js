const express = require("express");
const bodyParser = require("body-parser");
const server = require("./server");
const cors = require("./config/cors");
require('dotenv').config();

//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

//routes
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");


const app = express();

app.use(cors);
app.use(bodyParser.json());


if (process.env.NODE_ENV !== "test") {
    server.startMongo().catch(console.error);
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

app.use("/auth", userRoutes);
app.use("/contacts", contactRoutes);

module.exports = app;

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
                url: "https://mycontacts-qzj8.onrender.com", description: "Render Server"
            },
            {
                url: "http://localhost:3001", description: "Local Server"
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
    apis: ["./src/config/swagger.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
