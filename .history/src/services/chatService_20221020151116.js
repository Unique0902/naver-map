export default class ChatService {
  constructor(http, socket) {
    this.http = http;
    this.socket = socket;
  }

  async getChats(username) {
    const query = username ? `?username=${username}` : '';
    return this.http.fetch(`/chats${query}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
  }

  async postChat(chat) {
    return this.http.fetch(`/chats`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ text, username: 'ellie', name: 'Ellie' }),
    });
  }

  async deleteChat(chatId) {
    return this.http.fetch(`/chats/${chatId}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
  }
}
