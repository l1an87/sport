const signalR = require('@microsoft/signalr');

let connection = null;

export const chatInit = () => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl('/competitionapi/chatHub')
    .withAutomaticReconnect()
    .build();
  return connection.start();
};

export const chatGetMessages = (before) => connection
  .invoke('getMessages', {
    before,
    latest: 100,
  });

export const chatSendMessage = (data) => connection
  .invoke('sendMessage', data);

export const chatOnMessage = (fn) => {
  connection.on('chatMessage', (res) => {
    fn(res.message);
  });
};
