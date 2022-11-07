export default class UserDataService {
  constructor(http, socket) {
    this.http = http;
    this.socket = socket;
  }

  getBlameData = async (userId) => {
    return await this.http.fetch(`/userdata/blamedata/${userId}`, {
      method: 'GET',
    });
  };

  getPraiseData = async (userId) => {
    return await this.http.fetch(`/userdata/praisedata/${userId}`, {
      method: 'GET',
    });
  };

  getBlacklist = async (userId) => {
    return await this.http.fetch(`/userdata/blacklist/${userId}`, {
      method: 'GET',
    });
  };

  updateBlameData = async (userId, isChecked1, isChecked2, isChecked3) => {
    const data = await this.http.fetch('/userdata/blamedata', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        isChecked1,
        isChecked2,
        isChecked3,
      }),
    });
    return data;
  };

  updatePraiseData = async (userId, isChecked1, isChecked2, isChecked3) => {
    const data = await this.http.fetch('/userdata/praisedata', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        isChecked1,
        isChecked2,
        isChecked3,
      }),
    });
    return data;
  };

  updateBlacklist = async (userId, isChecked1, isChecked2, isChecked3) => {
    const data = await this.http.fetch('/userdata/blacklist', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        opponentUserId,
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
