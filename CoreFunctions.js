//Here are the core back-end functions of the bot! These generally should not need to be changed.

// ==== Core Functions ===
//Sets the webhook for the bot
function setWebhook() {
  //Taken from "Current Web App Url" under Publish... Deploy as Web App...
  messagePayload.url =
    "";
  var method = "setWebhook";
  var response = sendPayload(method, messagePayload);
  console.log(JSON.stringify(response.getContentText()));
}

//Sends data to telegram server!
/**
 * The primary function to send data to the Telegram server!
 * 
 * @param {string} method Selects the method of the telegram request (Full list of methods on the telegram bot api site) 
 * @param {object} payload the object you want telegram to process
 * @param {string} [contentType=applicationjson] content type of the request
 */
function sendPayload(method, payload, contentType = "application/json") {

  payload.parse_mode = "HTML";
  var options = {
    method: "post",
    contentType: contentType,
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };
  //console.log("payload for sendPayload is "+ JSON.stringify(payload));
  var response = UrlFetchApp.fetch(responseUrl + method, options);

  if (response.getResponseCode() != 200) {
    console.log(
      "sendPayload failed with response code: " +
        response.getResponseCode() +
        "\n\nResponse: " +
        JSON.stringify(response.getContentText())
    );
  }

  //Clearing the messagePayload object to be reused
  messagePayload = {};
  return response;
}

//Sends data to telegram server!
/**
 * Depending on the time, returns a text reference : eg: morning
 */
//Converts the time into a time text
function timeText() {
  var rawTime = new Date();
  var timeH = rawTime.getHours();
  if (timeH >= 6 && timeH <= 11) {
    var timeText = "morning";
  } else if (timeH > 11 && timeH <= 17) {
    var timeText = "afternoon";
  } else if (timeH > 17 && timeH <= 20) {
    var timeText = "evening";
  } else if (timeH < 6 || timeH > 20) {
    var timeText = "night";
  }
  return timeText;
}

