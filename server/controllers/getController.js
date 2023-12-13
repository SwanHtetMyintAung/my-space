const USER = require('../models/User')
const TASK = require('../models/Task');
const NOTE = require('../models/Note')
const mongoose  = require('mongoose');


async function getTasks(req, res) {
    const userId = req.cookies.user;
    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "You haven't logged in yet" });
      }
  
      const user = await USER.findOne({ _id: userId });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const taskIds = user.tasks || [];
      const taskArray = [];
  
      for (let i = 0; i < taskIds.length; i++) {
        const task = await TASK.findById(taskIds[i]);
        taskArray.push(task);
      }
      return res.status(200).json(taskArray);
  
    } catch (err) {
      console.error('Error in getTasks:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
async function getNotes(req, res) {
    const userId = req.cookies.user;
    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "You haven't logged in yet" });
      }
  
      const user = await USER.findOne({ _id: userId });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const noteIds = user.notes || [];
      const noteArray = [];
  
      for (let i = 0; i < noteIds.length; i++) {
        const note = await NOTE.findById(noteIds[i]);
        noteArray.push(note);
      }
      return res.status(200).json(noteArray);
  
    } catch (err) {
      console.error('Error in getNotes:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
async function getProfile(req,res){
    const userId = req.cookies.user;
    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "You haven't logged in yet" });
      }
  
      const user = await USER.findOne({ _id: userId });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user)

  
    } catch (err) {
      console.error('Error in getTasks:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

module.exports = {
  getTasks , getProfile , getNotes
}