function dataHandler(msgData) {
  const rowMap = getRow(msgData.chat_id);
  if (msgData.is_msg) {
    if (msgData.text == '/start') {
      saveData(msgData);
      sendQuestion(msgData,nextState=1);
    } else {
      const nextState = getNextState(rowMap);
      sendQuestion(msgData, nextState);
      setChatsVals(msgData, nextState, rowMap, 'is_msg');
    }
  } else if (msgData.is_button) {
    if (msgData.data != 'done') {
      editMessage(msgData)
      const nextState = getNextState(rowMap);
      sendQuestion(msgData, nextState);
      setChatsVals(msgData, nextState, rowMap, 'is_button');
    }
  }
}


function saveData(msgData) {
  const msg = "Приветствую тебя в боте!\nЛови первый вопрос квиза";
  send(msg,msgData.chat_id);

  const vals = [msgData.chat_id, msgData.user_name, '1', msgData.date]
  usersSheet.appendRow(vals);
}


