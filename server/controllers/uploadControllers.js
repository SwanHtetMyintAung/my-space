const TASK = require('../models/Task');
const USER = require('../models/User');
const NOTE = require('../models/Note');


async function uploadNewTask(req, res) {
    const text = req.body.text;//extract text from request 
    try {
      //make a new Task document
      const newTask = new TASK({
        text: text
      });
  
      const taskResult = await newTask.save();
      const taskId = taskResult._id;//get the id from the task we just save
  
      const userId = req.cookies.user;//get the user id from cookie
  
      //find the user with user_id
      const user = await USER.findOne({ _id: userId });
      
      //if we find the user , push the ID of the task into user > task array
      if (user) {
        
        user.tasks.push(taskId);
  
        //save the result
        const updateUser = await user.save();
  
        //just normal responses :D
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
async function uploadNewNote(req, res) {
    const text = req.body.text;//extract text from request 
    try {
      //make a new Note document
      const newNote = new NOTE({
        text: text
      });
  
      const NoteResult = await newNote.save();
      const NoteId = NoteResult._id;//get the id from the note we just save
  
      const userId = req.cookies.user;//get the user id from cookie
  
      //find the user with user_id
      const user = await USER.findOne({ _id: userId });
       //if we find the user , push the ID of the note into user > notes array 
      if (user) {
        
        user.notes.push(NoteId);
  
        //save the result        
        const updateUser = await user.save();
        //just normal responses :D
        if (updateUser) {
          console.log('Note added to user successfully');
          res.status(200).json(NoteResult);
        } else {
          console.log('Failed to update user with Note');
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
  
module.exports = {
  uploadNewTask , uploadNewNote
}