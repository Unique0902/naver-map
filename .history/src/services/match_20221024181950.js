export default class MatchService {
  constructor(http) {
    this.http = http;
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
}
