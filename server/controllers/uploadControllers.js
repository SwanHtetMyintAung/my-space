const TASK = require('../models/Task');
const USER = require('../models/User');

async function uploadNewTask(req, res) {
    const text = req.body.text;
    
    try {
      
      const newTask = new TASK({
        text: text
      });
  
      const taskResult = await newTask.save();
      const taskId = taskResult._id;
  
      const userId = req.cookies.user;
  
      
      const user = await USER.findOne({ _id: userId });
      
      if (user) {
        
        user.tasks.push(taskId);
  
        
        const updateUser = await user.save();
  
        if (updateUser) {
          console.log('Task added to user successfully');
          res.status(200).json(taskResult);
        } else {
          console.log('Failed to update user with task');
          res.status(500).json({ error: 'Internal Server Error' });
        }
      } else {
        console.log('User not found');
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.log('Error uploading task:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
module.exports = uploadNewTask