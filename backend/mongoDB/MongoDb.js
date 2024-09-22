const mongoose = require("mongoose");

const mongoURI = 'mongodb+srv://mukulved07:sXXCXdeb5le04Zh2@cluster0.qxkhg.mongodb.net/Mean'
const MongoDBData  = mongoose.connect(mongoURI).then(()=>{
    console.log("Connected to MongoDB")
}).catch((error)=>{
    console.log("Error connecting to MongoDB" , error)
})
module.exports = MongoDBData ;
