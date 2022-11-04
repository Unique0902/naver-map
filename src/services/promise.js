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
  amend = async (loc, time, id) => {
    const data = await this.http.fetch('/promise/amend', {
      method: 'POST',
      body: JSON.stringify({
        loc,
        time,
        id,
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
    return await this.http.fetch(`/promise/complete/${promiseId}/${roomId}`, {
      method: 'DELETE',
    });
  };

  cancel = async (promiseId, roomId) => {
    return await this.http.fetch(`/promise/cancel/${promiseId}/${roomId}`, {
      method: 'DELETE',
    });
  };

  delete = async (promiseId) => {
    return this.http.fetch(`/promise/${promiseId}`, {
      method: 'DELETE',
    });
  };

  onDeleteSync = async (callback) => {
    return await this.socket.onSync('promise-delete', callback);
  };

  onMakeSync = async (callback) => {
    return await this.socket.onSync('promise-make', callback);
  };
}
