export default class MatchingService {
  constructor(http) {
    this.http = http;
  }

  findMatching = async (slat, slng, alat, alng, srad, arad) => {
    const data = await this.http.fetch('/match/find', {
      method: 'POST',
      body: JSON.stringify({
        slat,
        slng,
        alat,
        alng,
        srad,
        arad,
      }),
    });
    return data;
  };
}
