const express = require("express");
const connectDB = require("./src/config/db");

const app = express();

app.use(express.json());

const startServer = async () => {
    try {
        const db = await connectDB();

        app.get("/", (req, res) => {
            res.json({
                message: "Rambura backend is running"
            });
        });

        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });

    } catch (error) {
        console.error(error);
    }
};

startServer();