const fetch = import('node-fetch');

function getNumPlayers(serverName, servers) {
  for (let i = 0; i < servers.length; i++) {
    if (servers[i].Name === serverName) {
      return servers[i].NumPlayers;
    }
  }
  return null; // If server with specified name not found
}

let player = 0;
let servers; // Declare the servers variable

function getMessage() {
  return fetch("https://corsredirect.herokuapp.com/http://arkdedicated.com/xbox/cache/officialserverlist.json")
    .then(response => response.json()) // Convert the response to a JSON object
    .then(data => {
      servers = data; // Store the JSON data in the servers variable
      console.log(servers); // Outputs the array of JSON objects
    })
    .catch(error => console.error(error));
}

const webhookURL = "https://corsredirect.herokuapp.com/https://discord.com/api/webhooks/1090103309987233882/MBRYFfZL_5WpM3CjsWew7W1DE6b2-bm2i5v-8TIgKhdUNeJ1zT3xE7u9AJtOo393lmha";

async function sendMessage(content) {
  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: content })
    });

    console.log("Response from sendMessage: ", response);
    return response.json();
  } catch (error) {
    console.error("An error occurred in sendMessage:", error);
  }
}

async function editMessage(messageID, content) {
  try {
    const response = await fetch(webhookURL + "/messages" + "/" + messageID, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: content })
    });

    console.log("Response from editMessage: ", response);
    console.log("Response JSON from editMessage: ", await response.json());
  } catch (error) {
    console.error("An error occurred in editMessage:", error);
  }
}

let intervalID;

async function startEditingMessage(messageID) {
  let content = "Goodbye, Discord!";
  intervalID = setInterval(async () => {
    await getMessage();
    const serverPop = getNumPlayers("EU-PVP-XboxOfficial-GenTwo1567", servers);
    if (serverPop !== null) {
      content = `Server population on **1567** is: **${serverPop}**`;
      await editMessage(messageID, content);
    }
  }, 10000);
}

async function stopEditingMessage() {
  clearInterval(intervalID);
}

module.exports = {
  startEditingMessage,
  stopEditingMessage,
  sendMessage,
  webhookURL,
  getMessage,
  getNumPlayers
};
