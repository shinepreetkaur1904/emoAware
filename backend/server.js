const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Groq = require('groq-sdk');

const app = express();
app.use(cors());
app.use(express.json());

// Groq setup
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/emoaware')
  .then(() => console.log('MongoDB connected ✅'))
  .catch(err => console.log(err));

// Chat Schema
const chatSchema = new mongoose.Schema({
  userMessage: String,
  botReply: String,
  emotion: String,
  email: String,   // ← ADD THIS LINE
  timestamp: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', chatSchema);

// POST - chat with Groq
app.post('/api/chat', async (req, res) => {
  console.log('hit!', req.body);
  const { userMessage, emotion, email } = req.body;

  try {
    console.log('calling groq with:', userMessage, emotion);
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are EmoAware, a warm and empathetic emotional support assistant. 
          The user is feeling ${emotion}. 
          Respond with kindness and empathy in 2-3 sentences max. Use gentle emojis.`
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      model: "llama-3.3-70b-versatile",
    });

    const botReply = completion.choices[0].message.content;

    const chat = new Chat({ userMessage, botReply, emotion, email });
    await chat.save();

    res.json({ botReply });
  } catch (err) {
    console.log(err);
    res.status(500).json({ botReply: "I'm here for you 🤍 Tell me more." });
  }
});

// GET - chat history
app.get('/api/history', async (req, res) => {
  const { email } = req.query;

  let history;

  if (email) {
    history = await Chat.find({ email }).sort({ timestamp: -1 });
  } else {
    history = await Chat.find().sort({ timestamp: -1 });
  }

  res.json(history);
});

app.listen(3000, () => console.log('Server running on port 3000 🚀'));