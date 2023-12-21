const USER = require('../models/User')
const TASK = require('../models/Task');
const mongoose  = require('mongoose');

async function deleteOneTask(req, res) {
    const userId = req.cookies.user;//extract user id from cookies
    const taskId = req.params.id;//extract task_id from search query
    try {
      //check if the id is indeed mongodb id or not
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "You haven't logged in yet" });
      }
      //find user by user_id
      const user = await USER.findOne({ _id: userId });
  
      //return 404 if there's no user
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
      //check if the task is actually deleted or not
      if (deleteTask.deletedCount > 0) {
        console.log("Successfully deleted the task!");//console.log for sever-side debugging 
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

async function checkTask(req,res){
  const taskId = req.params.id;//extract task_id from search query
  
  try{
    //get a task that match the task_id
    const Task = await TASK.findOne({ _id:taskId })
    //if we can't find the task , throw error
    if(!Task){
      res.status(400).json({message : "No Task Was Found"})
    }else{
      //if we found the task , changed the task.checked field to opposite
      Task.checked = !Task.checked
      const result = await Task.save();//save the data
      console.log(result)
      if(!result){
        res.status(500).json({message : "Internal Server Error!"})
      }
      res.status(200).json({message : "Mission Succeed"})

    }
  }catch(error){
    res.json({message : error})
  }
}
  

module.exports = {
  deleteOneTask , checkTask
}