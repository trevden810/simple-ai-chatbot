require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  openaiApiKey: process.env.OPENAI_API_KEY,
  modelName: process.env.MODEL_NAME || 'gpt-4-turbo-preview'
};