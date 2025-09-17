const cors = require("cors");

const corsOptions = {
    origin: [
        "http://localhost:3000",
        "https://68cac6bbcd557d0008d12e7b--mycontacts-chengzhe.netlify.app/",
        "https://mycontacts-chengzhe.netlify.app/"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

module.exports = cors(corsOptions);
