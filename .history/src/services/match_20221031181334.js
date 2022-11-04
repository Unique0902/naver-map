export default class MatchService {
  constructor(http, socket) {
    this.http = http;
    this.socket = socket;
  }

  take = async (matchId) => {
    return await this.http.fetch(`/match/${matchId}`, {
      method: 'GET',
    });
  };

  end = async (status, matchId) => {
    const data = await this.http.fetch('/match/end', {
      method: 'POST',
      body: JSON.stringify({
        status,
        matchId,
      }),
    });
    return data;
  };

  cancel = async (matchId) => {
    return await this.http.fetch(`/match/${matchId}`, {
      method: 'DELETE',
    });
  };

  onDeleteSync = async (callback, roomId) => {
    return await this.socket.onSync('match-delete', callback);
  };

  onMakeSync = async (callback) => {
    return await this.socket.onSync('match-make', callback);
  };
}
