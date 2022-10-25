export default class MatchingService {
  constructor(http) {
    this.http = http;
  }

  findMatching = async (pos, rad) => {
    const data = await this.http.fetch('/match/find', {
      method: 'POST',
      body: JSON.stringify({
        pos,
        rad,
      }),
    });
    return data;
  };
}
