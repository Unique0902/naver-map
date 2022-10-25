export default class MatchService {
  constructor(http) {
    this.http = http;
  }

  cancel = async (matchId) => {
    return await this.http.fetch(`/match/${matchId}`, {
      method: 'DELETE',
    });
  };
}
