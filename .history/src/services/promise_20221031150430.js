export default class PromiseService {
  constructor(http) {
    this.http = http;
  }

  findByMatchId = async (matchId) => {
    return this.http.fetch(`/promise/findbymatchid/${matchId}`, {
      method: 'GET',
    });
  };

  make = async (loc, time, matchId) => {
    const data = await this.http.fetch('/promise/make', {
      method: 'POST',
      body: JSON.stringify({
        loc,
        time,
        matchId,
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

  delete = async (promiseId) => {
    return this.http.fetch(`/promise/${promiseId}`, {
      method: 'DELETE',
    });
  };
}
