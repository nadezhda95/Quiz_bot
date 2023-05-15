function doPost(e) {
  const update = JSON.parse(e.postData.contents);
  let msgData = {}
  if (update.hasOwnProperty('message')) {
    msgData = {
      id         : update.message.message_id,
      chat_id    : update.message.chat.id,
      user_name  : update.message.from.username,
      text       : update.message.text,
      date       : (update.message.date/86400)+25569.125,
      is_msg     : true
    }
  }

  else if (update.hasOwnProperty('callback_query')) {
    msgData = {
      id         : update.callback_query.message.message_id,
      chat_id    : update.callback_query.message.chat.id,
      user_name  : update.callback_query.from.username,
      text       : update.callback_query.message.text,
      date       : (update.callback_query.message.date/86400)+25569.125,
      data       : update.callback_query.data,
      is_button  : true
    }
  }
  
  dataHandler(msgData)
}




