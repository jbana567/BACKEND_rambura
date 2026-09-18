const express = require("express");
const connectDB = require("./src/config/db");
const { ObjectId } = require("mongodb")
//-------------------------------------------------
//  --------- SWAGGER ------------------------
//---------------------------------
const swaggerUI=require("swagger-ui-express");
const swaggerSpec=require("./Swagger")
 //-------------------------------------------------
 //  ---------  ROUTES  ------------------------
 //---------------------------------
const reportRoute=require("./src/config/routes/reportRoute");
const inventoryItemRoute=require("./src/config/routes/inventoryItemRoute");
const repairRoute=require("./src/config/routes/repairRoute");
const inventoryTransactionRoute=require("./src/config/routes/inventoryTransactionRoute");

const app = express();


const PORT=3000;

app.use(express.json());

 app.use("/api-docs",
        swaggerUI.serve,
        swaggerUI.setup(swaggerSpec)
    );
    

const startServer = async () => {
    try {
        const db = await connectDB();

        app.get("/", async(req, res) => {
            res.json({
                message: "Rambura backend is running"
            });
        });
     app.use("/inventoryItem",inventoryItemRoute(db));
     app.use("/inventoryTransanction",inventoryTransactionRoute(db));
     app.use("/repair",repairRoute(db));
     app.use("/report",reportRoute(db));

    

app.listen(3000, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error(error);
    }
};

startServer();

