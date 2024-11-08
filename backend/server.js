const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection with updated options
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // Increased timeout
  socketTimeoutMS: 45000, // Increased socket timeout
  family: 4
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    console.error('Connection string:', process.env.MONGODB_URI.replace(/:([^:@]{8})[^:@]*@/, ':****@'));
    console.error('Please check your MONGODB_URI in .env file');
    process.exit(1);  // Exit the process on connection failure
  });

// Define a basic Message schema for contact form
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Routes

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Contact form submission route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Message({
      name,
      email,
      message
    });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending message' });
  }
});

// Projects route (you can modify this based on your needs)
app.get('/api/projects', (req, res) => {
  // Add your projects data here
  const projects = [
    {
      id: 1,
      title: 'Project 1',
      description: 'Description for project 1',
      technologies: ['React', 'Node.js', 'MongoDB'],
      imageUrl: 'url-to-image',
      githubUrl: 'url-to-github',
      liveUrl: 'url-to-live-site'
    },
    // Add more projects as needed
  ];
  res.json(projects);
});

// Serve static files in production (if needed)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});