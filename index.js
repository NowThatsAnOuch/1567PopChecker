const express = require('express');
const { startEditingMessage, stopEditingMessage, sendMessage, getMessage, getNumPlayers, setWebhookURL, setMessageID } = require('./node');

const app = express();
const port = process.env.PORT || 3000;

// Route to start editing the message
app.get('/start', async (req, res) => {
  try {
    const messageID = await getMessage();
    await startEditingMessage(messageID);
    res.send(`Started editing message with ID: ${messageID}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error starting editing message');
  }
});

// Route to stop editing the message
app.get('/stop', async (req, res) => {
  try {
    await stopEditingMessage();
    res.send('Stopped editing message');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error stopping editing message');
  }
});

// Route to send a message to the webhook URL
app.get('/send', async (req, res) => {
  try {
    const response = await sendMessage('Initializing');
    res.send(`Sent message with status ${response.status}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending message');
  }
});

// Route to set the webhook URL
app.get('/set-webhook-url/:url', (req, res) => {
  try {
    setWebhookURL(req.params.url);
    res.send(`Webhook URL set to ${req.params.url}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error setting webhook URL');
  }
});

// Route to set the message ID
app.get('/set-message-id/:id', (req, res) => {
  try {
    setMessageID(req.params.id);
    res.send(`Message ID set to ${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error setting message ID');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
