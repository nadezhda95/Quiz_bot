const doc = SpreadsheetApp.getActive();
const questionsSheet = doc.getSheetByName("Questions");
const answersSheet = doc.getSheetByName("Answers");
const usersSheet = doc.getSheetByName("Users");
const logSheet = doc.getSheetByName("Log");

const token = "Your telegram bot token"

function api_connector () {
  const App_link = "Your app link";
  UrlFetchApp.fetch("https://api.telegram.org/bot"+token+"/setWebHook?url="+App_link); 
}