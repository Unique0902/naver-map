export default class ChatService {
  constructor(http, socket) {
    this.http = http;
    this.socket = socket;
  }

  getChats = async (roomId) => {
    return this.http.fetch(`/chat/${roomId}`, {
      method: 'GET',
    });
  };

  postChat = async (chat) => {
    return this.http.fetch(`/chat/make`, {
      method: 'POST',
      body: JSON.stringify({ ...chat }),
    });
  };

  deleteChat = async (chatId) => {
    return this.http.fetch(`/chat/${chatId}`, {
      method: 'DELETE',
    });
  };

  onSync = (callback) => {
    return this.socket.onSync('chat', callback);
  };
}
