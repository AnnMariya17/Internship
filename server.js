const mongoose = require("mongoose");
const express = require("express");
const app = express();
const AddProject = require("./models/project3");
const cors = require("cors");
const path = require("path");

const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb+srv://annmariyakg73:annmariya@cluster0.0frzoyv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

app.use(cors());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// GET all projects
app.get('/api/services', async (req, res) => {
  try {
    const projects = await AddProject.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// POST new project
app.post('/api/services', async (req, res) => {
  const { name, status } = req.body;

  if (!name || !status) {
    return res.status(400).json({ error: 'Name and status are required' });
  }
const prjDetails = new AddProject({ id: Date.now(), name, status });
try {
    await prjDetails.save();
    res.status(200).json({ message: 'Project added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save project' });
  }
});

// Contact Form Schema (MongoDB)
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// API endpoint to handle form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({
      name,
      email,
      message
    });
    await newContact.save();
    res.json({ message: 'Thank you for contacting us!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save contact data' });
  }
});
// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

