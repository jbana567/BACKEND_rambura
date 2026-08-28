const express = require("express");
const connectDB = require("./src/config/db");
const {ObjectId}=require("mongodb")
const app = express();

app.use(express.json());

const startServer = async () => {
    try {
        const db = await connectDB();

        app.get("/", async(req, res) => {
            res.json({
                message: "Rambura backend is running"
            });
        });
app.get("/dashboard",async(req,res)=>{
     const user=[];
     const result= await db.collection("user").find().forEach((data)=>{
        user.push(data)
     });
      res.json(user);
}) 
app.get("/dashboard/:id",async(req,res)=>{
    const id=req.params.id;
    const data=await db.collection("user").findOne({_id:new ObjectId(id)})
    res.json(data);
})

app.post("/insert",async(req,res) =>{
    const body=req.body
    const results= await db.collection("user").insertMany(body);
    res.json(results);
})

app.patch("/update/:id",async (req,res) =>{
    const id=req.params.id;
    const data=await db.collection("user").updateOne({_id:new ObjectId(id)},{$set:{name:req.body.name}})
    res.json(data);

})


app.listen(3000, () => {
            console.log("Server running on port 3000");
        });

    } catch (error) {
        console.error(error);
    }
};

startServer();