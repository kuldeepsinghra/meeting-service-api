const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  title: String,
  starttime: String, 
  endtime: String,   
  date: String       
});

module.exports = mongoose.model('Meeting', meetingSchema);
