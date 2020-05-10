# dchianTbotTemplate
Template for my Telegram Bots which runs on Google Cloud 

There are 3 Main files in this template
> MainCode.js

> CoreFunctions.js

> CallbackQueries.js

## === Initial Set-up ===
### --- on Telegram ---

Speak to BotFather to create the bot
Copy and record the unique token
eg: somenumbers:somelettersandnumbers

### --- on Google Cloud Console ---

Create a Google Cloud Project

Create an OAuthConsent Screen and under "Authorized Domains" use api.telegram.org

### --- on Google Drive ---

Create a Google Script

> Within the Script you can rename Code.gs to MainCode.gs for consistency

Within the App Script interface create CallbackQueries and CoreFunctions...
File > New > Script File

Copy the data from MainCode.js, CoreFunctions.js, CallbackQueries.js into these files

Publish the Web App via
Publish > Deploy as Web App > "Who has access to this..." > "Anyone, Even Anonymous"

Note: every time you update the code, you need to publish a "new" version of the code, publishing an "update" doesnt seem to reflect on Telegram servers.

## === Initial Configuration ===
### --- MainCode.js ---
> This receives the telegram messages/data in the form of the doPost() function

Replace:
> line 8: var botToken = ""; 

With the Telegram Bot Token sent by the BotFather

> line 8: var botToken = "somenumbers:somelettersandnumbers";

### --- CoreFunctions.js ---
> This contains the core functions that are referenced frequently

Replace:
> Under setWebHook() 

> line 8: ""; 

With the Web App URL(Publish > Deploy as Web App... > Current Web App URL..)

> line 8: "https://script.google.com....../exec";

There is a function setFunctions() where you can update the functions that are displayed on the telegram interface. Of course you could use unlisted functions if you wanted to...

### --- CallbackQueries.js ---
> This processes the callback queries
