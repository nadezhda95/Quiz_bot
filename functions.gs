function editMessage(msgData) {
  const answersArr = answersSheet.getDataRange().getValues().filter(e => e[0] == msgData.text[0]);
  const curAnswerArr = answersArr.find(e => e[1] == msgData.data);

  Logger.log(answersArr)
  Logger.log(curAnswerArr)

  let newText = new String();
  if (curAnswerArr[2]) newText = msgData.text + '\n\n✅Wow\nТвой ответ: '+msgData.data;
  else newText = msgData.text + '\n\n❌Nope\nТвой ответ: '+msgData.data;


////////
  const arr = new Array()
  answersArr.forEach(el => {
    if (el[2]) arr.push([{"text":'☑️ '+el[1], "callback_data":'done'}])
    else arr.push([{"text":'✖️ '+el[1], "callback_data":'done'}])
  })

  const keyboard = {
    "inline_keyboard": arr
  }
//////////////

  editMsg(newText,msgData.chat_id,msgData.id,keyboard);

}

function getNextState(rowMap) {
  const currentState = rowMap.get("progress");
  const nextState = Number(currentState) + 1;

  return nextState
}

function createKeyboard(questionArr) {
  const answersArr = answersSheet.getDataRange().getValues();

  let arr = answersArr.filter(el => el[0] == questionArr[0])
  arr = arr.map(el => [{"text":el[1], "callback_data":el[1]}])

  const keyboard = {
    "inline_keyboard": arr
  }

  return keyboard
}



function setChatsVals(msgData, progress, rowMap, flag) {
  flag == 'is_button' ? rowMap.set(rowMap.get("progress"), msgData.data) : rowMap.set(rowMap.get("progress"), msgData.text);

  rowMap.set("username", msgData.user_name);
  rowMap.set("progress", progress);
  rowMap.set("date", msgData.date);
  
  const rowArr = new Array()
  const iterator = rowMap.values()
  rowMap.forEach(() => rowArr.push(iterator.next().value))

  const ind = rowArr.shift();
  usersSheet.getRange(ind+1,1,1,rowArr.length).setValues([rowArr])
}

function getRow(chat_id) {
  const usersArr = usersSheet.getDataRange().getValues();
  const headerUsersArr = usersArr.shift().flat();
  usersArr.reverse();
  const ind = usersArr.findIndex(e => e[0] == chat_id);

  if (ind < 0) return null
  else {
    const rowInd = usersArr.length - ind;
    const rowArr = usersArr[ind]
    const rowMap = new Map();
    rowMap.set('ind', rowInd)
    rowArr.forEach((e,i) => rowMap.set(headerUsersArr[i], e));

    Logger.log(rowArr)
    return rowMap;
  }
}


function sendQuestion(msgData, nextState) {
  const questionsArr = questionsSheet.getDataRange().getValues();

  if (nextState <= questionsArr.length) {
    const questionArr = questionsArr.find(e => e[0] == nextState).flat();
    const question = questionArr[0]+'/'+questionsArr.length+': '  +questionArr[1];
    const keyboard = createKeyboard(questionArr);
    send(question, msgData.chat_id, keyboard)
  } else {
    const msg = 'Поздравляю! 🎊\nКвиз пройден'
    send(msg, msgData.chat_id, null)
  }
}
