export default (onMessage) => {
  const socket = new WebSocket(`${process.env.WS_URL}`);
  const message = {
    command: 'subscribe',
    identifier: JSON.stringify({
      channel: 'notifications',
    }),
  };
  setTimeout(()=> {
    socket.send(JSON.stringify(message));
  }, 5000)
  socket.onmessage = onMessage;
};
