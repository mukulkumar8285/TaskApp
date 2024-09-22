const mongoose = require("mongoose");

const DashboardModel = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
      default: "To Do",
    },
    Priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    DueData: {
      type: Date,
      required: true,
    },
  },
  { timeseries: true }
);

const ProfileModel = mongoose.model("Task", DashboardModel);

module.exports = ProfileModel;
