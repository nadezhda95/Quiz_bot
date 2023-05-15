function send(msg, chat_id, keyboard) {
  const payload = {
    'method': 'sendMessage',
    'chat_id': String(chat_id),
    'text': msg,
    'parse_mode': 'HTML'
  }
  if (keyboard) payload.reply_markup = JSON.stringify(keyboard)

  const data = {
    'method': 'post',
    'payload': payload,
    'muteHttpExceptions': true
  }
  
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}


function editMsg(msg, chat_id, msg_id, keyboard) {
  const payload = {
  'method': 'editMessageText',
  'chat_id': String(chat_id),
  'message_id': String(msg_id),
  'text': msg,
  'parse_mode': 'HTML'
  }
  if (keyboard) payload.reply_markup = JSON.stringify(keyboard)
  
  const data = {
    'method': 'post',
    'payload': payload,
    'muteHttpExceptions': true
  }
  
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}