# emoAware

emoAware is a web-based platform where users can interact with an AI chatbot and track emotional patterns from their conversations.  
The system analyzes user messages, classifies emotions, stores them in a database, and generates insights based on emotional trends.

The platform also includes relaxation features such as Zen Rain, a music system, and small interactive games.

---

## Features

### AI Chat
Users can interact with an AI chatbot.  
The system analyzes the text and classifies emotions into:

- Happy
- Sad
- Angry
- Neutral

---

### Emotion Insights
Conversation emotions are stored in the database and used to generate statistics such as emotional percentages and trends.

---

### Zen Rain
A relaxation page designed to create a calm environment.

Includes:
- Rain ambience
- Music system
- Minimal calming interface

The music system is implemented using a **Doubly Linked List**.

---

### Mini Games
The platform includes small browser-based games for engagement and relaxation.

---

## Data Structures Used

- **HashMap** – used to track emotion counts and calculate percentages
- **Stack** – used for interaction handling in some features
- **Doubly Linked List** – used in the Zen Rain music player

---

## Tech Stack

Frontend:
- HTML
- CSS
- JavaScript

Backend:
- Node.js

Database:
- MongoDB

---

## Project Structure
emoAware
│
├── backend        # Server and backend logic
├── dsa            # Data structure implementations
├── games          # Mini games
├── assets         # Static assets
├── images         # UI images
├── scripts        # JavaScript functionality
├── data           # Data files
├── information    # Project information files
│
├── index.html     # Main homepage
├── chat.html      # AI chat interface
├── insights.html  # Emotion analytics dashboard
├── games.html     # Games section
├── about.html     # Project information
├── join.html      # User entry page

--

##System Flow
User Chat
   ↓
Emotion Detection
   ↓
Emotion Stored in Database
   ↓
Data Processing
   ↓
Insights Dashboard

--

## Status

Project currently under development.
