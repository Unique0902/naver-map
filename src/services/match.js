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

  takeByUid = async (uid) => {
    return await this.http.fetch(`/match/takebyuid/${uid}`, {
      method: 'GET',
    });
  };

  end = async (status, matchId, roomId) => {
    const data = await this.http.fetch('/match/end', {
      method: 'POST',
      body: JSON.stringify({
        status,
        matchId,
        roomId,
      }),
    });
    return data;
  };

  cancel = async (matchId, roomId) => {
    return await this.http.fetch(`/match/${matchId}/${roomId}`, {
      method: 'DELETE',
    });
  };

  onDeleteSync = async (callback) => {
    return await this.socket.onSync('match-delete', callback);
  };

  onMakeSync = async (callback) => {
    return await this.socket.onSync('match-make', callback);
  };
}
