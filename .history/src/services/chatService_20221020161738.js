export default class ChatService {
  constructor(http, socket) {
    this.http = http;
    this.socket = socket;
  }

  getChats = async (username) => {
    const query = username ? `?username=${username}` : '';
    return this.http.fetch(`/chats${query}`, {
      method: 'GET',
    });
  };

  postChat = async (chat) => {
    return this.http.fetch(`/chats`, {
      method: 'POST',
      body: JSON.stringify({ text: 'saf', username: 'ellie', name: 'Ellie' }),
    });
  };

  deleteChat = async (chatId) => {
    return this.http.fetch(`/chats/${chatId}`, {
      method: 'DELETE',
    });
  };

  onSync = (callback) => {
    return this.socket.onSync('chats', callback);
  };
}
