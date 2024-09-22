const mongoose = require("mongoose");

const mongoURI = 'mongodb://localhost:27017/mydatabase'
const MongoDBData  = mongoose.connect(mongoURI).then(()=>{
    console.log("Connected to MongoDB")
}).catch((error)=>{
    console.log("Error connecting to MongoDB" , error)
})
module.exports = MongoDBData ;