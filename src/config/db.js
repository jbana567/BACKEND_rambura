const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const databaseName = process.env.MONGODB_DATABASE || "rambura";
const client = new MongoClient(uri);

const connectDB = async () => {
    try {
        await client.connect();

        console.log("MongoDB connected successfully");

        return client.db(databaseName);
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

module.exports = connectDB;