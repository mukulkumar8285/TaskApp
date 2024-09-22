const express = require("express");
const Dashboard = require("../controller/MainUser");
const authMiddleware = require("../middleware/middleware");

const dashrouter = express.Router();

dashrouter.post("/create" , authMiddleware ,Dashboard.CrateTask);
dashrouter.put("/update/:id" , authMiddleware ,Dashboard.UpdateTask);
dashrouter.delete("/delete/:id" , authMiddleware ,Dashboard.DeleteTask);
dashrouter.get("/read" , authMiddleware ,Dashboard.ReadTask);
dashrouter.get("/read/:id" , authMiddleware ,Dashboard.ReadTaskById);





module.exports = dashrouter;