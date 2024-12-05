const OpenAI = require('openai');
const config = require('./config');
const logger = require('./logger');

const openai = new OpenAI({
  apiKey: config.openaiApiKey
});

async function generateResponse(message, context = []) {
  try {
    const completion = await openai.chat.completions.create({
      model: config.modelName,
      messages: [
        { role: 'system', content: 'You are a helpful AI assistant.' },
        ...context,
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    return completion.choices[0].message.content;
  } catch (error) {
    logger.error('Error generating OpenAI response:', error);
    throw error;
  }
}

module.exports = { generateResponse };