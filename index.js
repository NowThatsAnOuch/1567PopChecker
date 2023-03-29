const express = import('express');
const app = express();
const port = process.env.PORT || 3000;
const functions = import('./node.js');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Now you can use the exported functions in your server routes
app.get('/start', (req, res) => {
  functions.startEditingMessage();
  res.send('Started editing message');
});

app.get('/stop', (req, res) => {
  functions.stopEditingMessage();
  res.send('Stopped editing message');
});

app.get('/message', async (req, res) => {
  await functions.getMessage();
  res.send('Fetched message');
});

app.get('/players', (req, res) => {
  const serverPop = functions.getNumPlayers("EU-PVP-XboxOfficial-GenTwo1567", functions.servers);
  if (serverPop !== null) {
    res.send(`Server population on **1567** is: **${serverPop}**`);
  } else {
    res.send('Server not found');
  }
});
