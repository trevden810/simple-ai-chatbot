const express = require('express');
const path = require('path');
const config = require('./config');
const logger = require('./logger');
const { generateResponse } = require('./openaiClient');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await generateResponse(message, context);
    res.json({ response });
  } catch (error) {
    logger.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Simple frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
});