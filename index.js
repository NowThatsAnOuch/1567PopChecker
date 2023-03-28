const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const {
  getNumPlayers,
  getMessage,
  sendMessage,
  editMessage,
  startEditingMessage,
  stopEditingMessage,
  initialize,
  setWebhookURL,
} = require('./functions');

app.get('/getNumPlayers', async (req, res) => {
  const serverName = req.query.serverName;
  const numPlayers = await getNumPlayers(serverName);
  res.send({ numPlayers });
});

app.get('/getMessage', async (req, res) => {
  const message = await getMessage();
  res.send({ message });
});

app.post('/sendMessage', async (req, res) => {
  const content = req.body.content;
  const response = await sendMessage(content);
  res.send(response);
});

app.patch('/editMessage', async (req, res) => {
  const messageID = req.body.messageID;
  const content = req.body.content;
  const response = await editMessage(messageID, content);
  res.send(response);
});

app.post('/startEditingMessage', async (req, res) => {
  const messageID = req.body.messageID;
  await startEditingMessage(messageID);
  res.send({ message: 'Editing started' });
});

app.post('/stopEditingMessage', async (req, res) => {
  await stopEditingMessage();
  res.send({ message: 'Editing stopped' });
});

app.get('/initialize', async (req, res) => {
  const response = await initialize();
  res.send(response);
});

app.post('/setWebhookURL', async (req, res) => {
  const webhookURL = req.body.webhookURL;
  await setWebhookURL(webhookURL);
  res.send({ message: 'Webhook URL set' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
