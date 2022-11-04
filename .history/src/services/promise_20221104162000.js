export default class PromiseService {
  constructor(http, socket) {
    this.http = http;
    this.socket = socket;
  }

  findByMatchId = async (matchId) => {
    return this.http.fetch(`/promise/findbymatchid/${matchId}`, {
      method: 'GET',
    });
  };

  make = async (loc, time, matchId, roomId) => {
    const data = await this.http.fetch('/promise/make', {
      method: 'POST',
      body: JSON.stringify({
        loc,
        time,
        matchId,
        roomId,
      }),
    });
    return data;
  };
  update = async (id, beforeMatchId) => {
    const data = await this.http.fetch('/promise/update', {
      method: 'POST',
      body: JSON.stringify({
        id,
        beforeMatchId,
      }),
    });
    return data;
  };

  complete = async (promiseId, roomId) => {
    const data = await this.http.fetch(
      `/promise/complete/${promiseId}/${roomId}`,
      {
        method: 'DELETE',
      }
    );
    return data;
  };

  cancel = async (promiseId, roomId) => {
    const data = await this.http.fetch(
      `/promise/cancel/${promiseId}/${roomId}`,
      {
        method: 'DELETE',
      }
    );
    return data;
  };

  delete = async (promiseId) => {
    return this.http.fetch(`/promise/${promiseId}`, {
      method: 'DELETE',
    });
  };

  onMakeSync = async (callback) => {
    return await this.socket.onSync('promise-make', callback);
  };
}
