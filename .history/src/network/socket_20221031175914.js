import socket from 'socket.io-client';

export default class Socket {
  constructor(baseURL) {
    this.io = socket(baseURL);

    this.io.on('connect_error', (err) => {
      console.log('socket error', err.message);
    });
  }

  onSync(event, callback, id) {
    if (!this.io.connected) {
      this.io.connect();
    }
    if (id) {
      this.io.in(id).on(event, (message) => callback(message));
    } else {
      this.io.on(event, (message) => callback(message));
    }
    return () => this.io.off(event);
  }

  joinChattingRoom(roomId) {
    this.io.emit('join', roomId);
  }
}
