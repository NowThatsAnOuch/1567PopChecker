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
  fetch("https://corsredirect.herokuapp.com/http://arkdedicated.com/xbox/cache/officialserverlist.json")
    .then(response => response.json()) // Convert the response to a JSON object
    .then(data => {
      servers = data; // Store the JSON data in the servers variable
      console.log(servers); // Outputs the array of JSON objects
    })
    .catch(error => console.error(error));
  player = getNumPlayers("EU-PVP-XboxOfficial-GenTwo1567", servers);
}

const webhookURL = "https://corsredirect.herokuapp.com/https://discord.com/api/webhooks/1090102232537641111/L7ZAbX9drXWFvYS6U8ikE5C27AFB3TAfttHFAf8blRho1yNDa_hoPkgtc_xYr3_Nw1PV";
let intervalID;

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

async function startEditingMessage(messageID) {
  let content = "Goodbye, Discord!";
  intervalID = setInterval(async () => {
    getMessage();
    content = `server pop on **1567** is: **${player}**`;
    await editMessage(messageID, content);
  }, 10000);
}

async function stopEditingMessage() {
  clearInterval(intervalID);
}

async function example() {
  const initialMessage = await sendMessage("Initializing");
  console.log(initialMessage); // log the response from sendMessage()
}

// Export the example function to make it accessible from outside the module
module.exports = {
  example
};
