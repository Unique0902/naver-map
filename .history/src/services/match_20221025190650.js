export default class MatchService {
  constructor(http, socket) {
    this.http = http;
    this.socket = socket;
  }

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

  onDeleteSync = (callback) => {
    return this.socket.onSync('match-delete', callback);
  };

  onMakeSync = (callback) => {
    return this.socket.onSync('match-delete', callback);
  };
}
