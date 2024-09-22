const ProfileModel = require("../module/MainModel");

const CrateTask = async (req, res) => {
  const { Title, Description, Status, Priority, DueData } = req.body;
  try {
    const newTask = ProfileModel({
      Title,
      Description,
      Status,
      Priority,
      DueData,
    });
    const TaskData = await newTask.save();

    res.json({
      message: "Task Created Successfully",
      data: TaskData,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error in the server",
      error: error.message,
    });
  }
};

const UpdateTask = async (req, res) => {
  const { id } = req.params;
  const { Title, Description, Status, Priority, DueData } = req.body;
  try {
    const UpdateTask = await ProfileModel.findByIdAndUpdate(id, {
      Title,
      Description,
      Status,
      Priority,
      DueData,
    });
    if (!UpdateTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({
      message: "Task Updated Successfully",
      data: UpdateTask,
    });
  } catch (error) {}
};

const DeleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const DeleteTask = await ProfileModel.findByIdAndDelete(id);
    if (!DeleteTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({
      message: "Task Deleted Successfully",
      Data: DeleteTask,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error in the server",
      error: error.message,
    });
  }
};

const ReadTask = async (req, res) => {
  try {
    
    const tasks = await ProfileModel.find(); 

    res.status(200).json({
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    
    res.status(500).json({
      message: "Error retrieving tasks",
      error: error.message,
    });
  }
};

const ReadTaskById = async (req, res) => {
  const {id} = req.params;

  try {
    
    const tasks = await ProfileModel.findById(id); 
    if(!tasks){
      return res.status(404).json({message: "User Not Found"})
    }
    res.status(200).json({
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving tasks",
      error: error.message,
    });
  }
};


const Dashboard = {
  CrateTask,
  UpdateTask,
  DeleteTask,
  ReadTask,
  ReadTaskById
};

module.exports = Dashboard;
