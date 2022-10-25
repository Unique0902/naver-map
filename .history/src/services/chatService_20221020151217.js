export default class ChatService {
  constructor(http, socket) {
    this.http = http;
    this.socket = socket;
  }

  async getChats(username) {
    const query = username ? `?username=${username}` : '';
    return this.http.fetch(`/chats${query}`, {
      method: 'GET',
    });
  }

  async postChat(chat) {
    return this.http.fetch(`/chats`, {
      method: 'POST',
      body: JSON.stringify({ text, username: 'ellie', name: 'Ellie' }),
    });
  }

  async deleteChat(chatId) {
    return this.http.fetch(`/chats/${chatId}`, {
      method: 'DELETE',
    });
  }

  onSync(callback) {
    return this.socket.onSync('chats', callback);
  }
}
