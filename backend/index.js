const express = require("express");
const router = require("./router/UserRouter");
const MongoDBData  = require("./mongoDB/MongoDb");
const dashrouter = require("./router/DashTopRouter");
const cors = require("cors");

const app = express();


app.use(express.json());
app.use(cors());

const PORT = 3000;
MongoDBData.then(() => {
    console.log('MongoDB connection successful');
})

app.use("/api/user" , dashrouter);
app.use("/api" , router);

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})