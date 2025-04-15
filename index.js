const express = require('express');
const mongoose = require('mongoose');
const meetingRoutes = require('./routes/meetings');

const app = express();
const PORT = 5000; 
const MONGO_URI = 'mongodb+srv://kuldeep99296654:itaU8V7K4c9Ufr4Y@cluster0.7mwvuom.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 


app.use(express.json());


app.use('/api/meetings', meetingRoutes);


mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log(' MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((error) => {
  console.error('MongoDB connection error:', error.message);
});


