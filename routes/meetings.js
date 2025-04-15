const express = require('express');
const router = express.Router();
const Meeting = require('../models/meeting');
const { generatedSlots } = require('../utils/slots');

// Schedule a meeting
router.post('/', async (req, res) => {
  try {
    const { title, starttime, endtime, date } = req.body;

    const conflict = await Meeting.findOne({
      date,
      $or: [
        { starttime: { $lt: endtime }, endtime: { $gt: starttime } }
      ]
    });

    if (conflict) {
      return res.status(400).json({ message: 'Time conflict with another meeting' });
    }

    const meeting = new Meeting({ title, starttime, endtime, date });
    await meeting.save();
    res.status(201).json({ message: 'Meeting scheduled', meeting });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Get available slots
router.get('/slots', async (req, res) => {
  try {
    const { date, option } = req.query;
    const meetings = await Meeting.find({ date });
    const slots = generatedSlots(date, meetings, option);
    res.json({ slots });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Reschedule a meeting
router.put('/:id', async (req, res) => {
  try {
    const { starttime, endtime, date } = req.body;
    const meetingId = req.params.id;

    const conflict = await Meeting.findOne({
      _id: { $ne: meetingId },
      date,
      $or: [
        { starttime: { $lt: endtime }, endtime: { $gt: starttime } }
      ]
    });

    if (conflict) {
      return res.status(400).json({ message: 'Time conflict with another meeting' });
    }

    const meeting = await Meeting.findByIdAndUpdate(meetingId, { starttime, endtime, date }, { new: true });

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.json({ message: 'Meeting rescheduled', meeting });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Cancel a meeting
router.delete('/:id', async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });

    const now = new Date();
    const meetingTime = new Date(`${meeting.date}T${meeting.starttime}`);

    if (meetingTime <= now) {
      return res.status(400).json({ message: 'Cannot cancel a meeting that has already started' });
    }

    await meeting.deleteOne();
    res.json({ message: 'Meeting cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
