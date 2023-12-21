const USER = require('../models/User')
const TASK = require('../models/Task');
const NOTE = require('../models/Note')
const mongoose  = require('mongoose');


async function getTasks(req, res) {
    const userId = req.cookies.user;//extract the user_id from cookies
    try {
      //check if the id is indeed the mongodb id or not
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "You haven't logged in yet" });
      }
      //get user with user_id
      const user = await USER.findOne({ _id: userId });
  
      //return 404 if there is not user
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      //get the task-ids from user or empty array if there's none
      const taskIds = user.tasks || [];
      const taskArray = [];//to store actual tasks
  
      //loop through the taskIDs and store each complete task into taskArray
      for (let i = 0; i < taskIds.length; i++) {
        const task = await TASK.findById(taskIds[i]);
        taskArray.push(task);
      }
      //return the taskArray if everything works
      return res.status(200).json(taskArray);
  
    } catch (err) {
      console.error('Error in getTasks:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
async function getNotes(req, res) {
    const userId = req.cookies.user;//extract the user_id from cookies
    try {
      //check if the id is indeed the mongodb id or not
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "You haven't logged in yet" });
      }
      //get user with user_id
      const user = await USER.findOne({ _id: userId });
  
      //return 404 if there is not user
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      //get the note-ids from user or empty array if there's none
      const noteIds = user.notes || [];
      const noteArray = [];//to store actual notes
  
      //loop through the taskIDs and store each complete task into taskArray
      for (let i = 0; i < noteIds.length; i++) {
        const note = await NOTE.findById(noteIds[i]);
        noteArray.push(note);
      }
      //return the NoteArray if everything works
      return res.status(200).json(noteArray);
  
    } catch (err) {
      console.error('Error in getNotes:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
async function getProfile(req,res){
    const userId = req.cookies.user;//extract the user_id from cookies
    try {
      //check if the id is indeed the mongodb id or not
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "You haven't logged in yet" });
      }
      //get user with user_id
      const user = await USER.findOne({ _id: userId });
      //return 404 if there is not user
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      //200 code and user if everything is okay
      res.status(200).json(user);

  
    } catch (err) {
      console.error('Error in getTasks:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

module.exports = {
  getTasks , getProfile , getNotes
}