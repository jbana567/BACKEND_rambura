require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");

const galleryRoutes = require("./src/config/models/controllers/routes/galleryRoutes");
const websiteRoutes = require("./src/config/models/controllers/routes/websiteRoutes");
const equipmentRoutes = require("./src/config/models/controllers/routes/equipmentRoutes");
const equipmentAssignmentRoutes = require("./src/config/models/controllers/routes/equipmentAssignmentRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const startServer = async () => {
    try {
        const db = await connectDB();
        app.locals.db = db;

        app.get("/", (req, res) => {
            res.json({
                message: "Rambura backend is running"
            });
        });

        app.use("/api/gallery", galleryRoutes);
        app.use("/api/website-content", websiteRoutes);
        app.use("/api/equipment", equipmentRoutes);
        app.use("/api/equipment-assignments", equipmentAssignmentRoutes);

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    } catch (error) {
        console.error(error);
    }
};

startServer();

module.exports = app;