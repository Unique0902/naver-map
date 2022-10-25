export default class MatchingService {
  constructor(http) {
    this.http = http;
  }

  findMatching = async (slat, slng, alat, alng, rad) => {
    const data = await this.http.fetch('/match/find', {
      method: 'POST',
      body: JSON.stringify({
        slat,
        slng,
        alat,
        alng,
        rad,
      }),
    });
    return data;
  };
}
