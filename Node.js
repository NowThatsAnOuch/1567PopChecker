const fetch = require('node-fetch');

function getNumPlayers(serverName, servers) {
  for (let i = 0; i < servers.length; i++) {
    if (servers[i].Name === serverName) {
      return servers[i].NumPlayers;
    }
  }
  return null; // If server with specified name not found
}

async function getMessage() {
  try {
    const response = await fetch("https://corsredirect.herokuapp.com/http://arkdedicated.com/xbox/cache/officialserverlist.json");
    const data = await response.json();
    const servers = data; // Store the JSON data in the servers variable
    console.log(servers); // Outputs the array of JSON objects
    return servers;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const webhookURL = "https://corsredirect.herokuapp.com/https://discord.com/api/webhooks/1073067319506514110/tjoNdPt9fctwX9bVUZGibX8Nu4mwfn88xbAYCJzx-4c9Njg9LPH9RFYIhBU2pojNDweT";

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
  let servers = await getMessage();
  let content = `server pop on **1567** is: **${getNumPlayers("EU-PVP-XboxOfficial-GenTwo1567", servers)}**`;
  intervalID = setInterval(async () => {
    servers = await getMessage();
    content = `server pop on **1567** is: **${getNumPlayers("EU-PVP-XboxOfficial-GenTwo1567", servers)}**`;
    await editMessage(messageID, content);
  }, 10000);
}

async function stopEditingMessage() {
  clearInterval(intervalID);
}

async function example() {
  const initialMessage = await sendMessage("Initializing");
}

// Call the example function to send the initial message
example();

// Export the functions that we want to use externally
module.exports = {
  startEditingMessage,
  stopEditingMessage
};
