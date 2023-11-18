const USER = require('../models/User')
const TASK = require('../models/Task');
const mongoose  = require('mongoose');

async function deleteOneTask(req, res) {
    const userId = req.cookies.user;
    const taskId = req.params.id;
    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "You haven't logged in yet" });
      }
  
      const user = await USER.findOne({ _id: userId });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Filter out the task from user.tasks
      user.tasks = user.tasks.filter(task => task.toString() !== taskId);
  
      // Save the changes to the user document
      const finalUser = await user.save();
      console.log(finalUser);
  
      // Delete the task from the TASK collection
      const deleteTask = await TASK.deleteOne({ _id: taskId });
  
      if (deleteTask.deletedCount > 0) {
        console.log("Successfully deleted the task!");
        return res.status(200).json({ tasks: finalUser.tasks });
      } else {
        console.log("Task not found or already deleted");
        return res.status(404).json({ message: "Task not found or already deleted" });
      }
    } catch (error) {
      console.error('Error in deleteOneTask:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

module.exports = deleteOneTask;