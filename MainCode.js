/*
=== Instructions ===
To send a message you need to use the sendPayload(method, payload, contentType)
contentType is defaulted to 'application/json', if attachments need to be sent then use 'multipart/form-data'
*/
//Global Variable Declarations
// -- Bot and Telegram Details --
var botToken = "";
var responseUrl = "https://api.telegram.org/bot" + botToken + "/";

//The payload template! Please fill in the necessary chat_id and text! The sendPayload function resets this after every run!
//More information on the telegram bot api reference
var messagePayload = {
  chat_id: null,
  text: null,
  parse_mode: "html",
};

//Template for inline keyboard callback function buttons
/*
var inlineKeys = [[row 1], [row 2], [row 3], ...]
- where each subarray within the main array represents a row of buttons

Each button is an object represented below where:
text -> the text on the button
callback_data -> the data sent to the telegram server when the button is pressed
- Do note that there is a size limit of 64 bytes, hence integers are preferred to long strings

{ text: string, callback_data: '{"key": int , "data": int OR string }' }

Please use specifically this format above, as it is encoding a JSON object which will be parsed later on.
*/
var inlineKeys = [
  [
    //Row 1 Buttons
    {
      text: "Button 1",
      callback_data: '{"key": int, "data": int OR string}',
    },
    {
      text: "Button 2",
      callback_data: '{"key": int, "data": int OR string}',
    },
  ],
  [
    //Row 2 Buttons
    {
      text: "Button 1",
      callback_data: '{"key": int, "data": int OR string}',
    },
  ],
];

//Telegram Commands and Interaction
function doPost(e) {
  //Validation 1 - Reject if request is not json
  if (e.postData.type == "application/json") {
    var update = JSON.parse(e.postData.contents);

    //If request is a callback query
    if (update.callback_query !== undefined) {
      messagePayload.chat_id = update.callback_query.from.id;
      messagePayload.action = "typing";
      sendPayload("sendChatAction", messagePayload);

      var callback = JSON.parse(update.callback_query.data);
      var callback_reply = callbackReply(callback.key, callback.data);

      if (messagePayload.document !== undefined) {
        messagePayload.chat_id = update.callback_query.from.id;

        sendPayload("sendDocument", messagePayload);
      }

      //Answers the callback, displays a short loading box to the user, required!
      messagePayload.text = "loading...";
      messagePayload.callback_query_id = update.callback_query.id;
      sendPayload("answerCallbackQuery", messagePayload);

      //Updates the message that the callback_query was called from
      messagePayload.chat_id = update.callback_query.from.id;
      messagePayload.message_id = update.callback_query.message.message_id;
      messagePayload.text = callback_reply;
      sendPayload("editMessageText", messagePayload);

      console.info(
        "Callback " + callback.key + " replied - data: " + callback.data
      );
    }

    //Else if request is a message
    else if (update.message !== undefined) {
      //If message starts with / - evaluate as a command
      if (update.message.text.charAt(0) === "/") {
        var message = update.message.text;
        //Commands - to build a command, its phrased as: if (/\/command/.test(message) == true) { run these functions;}

        if (/\/start/.test(message) == true) {
        } //End /start
        else {
          messagePayload.chat_id = update.message.chat.id;
          messagePayload.text =
            "Sorry " + update.message.from.first_name + ", invalid command.";
          sendPayload("sendMessage", messagePayload);
        } //End Commands
      } // End Verification - does not start with /
      else if (update.message.text.charAt(0) !== "/") {
        //If message not command
      }
    } //End Request Type Verification
  } // End Verification 1 - does not have content type application/json
}
// End of doPost function
