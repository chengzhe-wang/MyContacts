const cors = require("cors");

const corsOptions = {
    origin: [
        "http://localhost:3000",
        "https://68cac458e20d10ac5ecf3279--deft-pie-a199db.netlify.app/",
        "https://deft-pie-a199db.netlify.app/"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

module.exports = cors(corsOptions);
