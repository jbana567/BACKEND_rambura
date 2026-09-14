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
const userRoute=require("./src/config/routes/userRoute");
const departmentRoute=require("./src/config/routes/departmentRoute");
const staffRoute=require("./src/config/routes/staffRoute");
const newsRoute=require("./src/config/routes/newsRoute");

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
     app.use("/user",userRoute(db));
     app.use("/department",departmentRoute(db));
     app.use("/staff",staffRoute(db));
     app.use("/news",newsRoute(db));

    

app.listen(3000, () => {
            console.log(`Server running on http//localhost:${PORT}`);
        });

    } catch (error) {
        console.error(error);
    }
};

startServer();

