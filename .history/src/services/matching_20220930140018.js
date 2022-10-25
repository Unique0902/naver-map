export default class MatchingService {
  constructor(http) {
    this.http = http;
  }

  makeMatching = async (uid, slat, slng, alat, alng, srad, arad) => {
    const data = await this.http.fetch('/match/find', {
      method: 'POST',
      body: JSON.stringify({
        uid,
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
  cancelMatching = async (uid) => {
    return await this.http.fetch(`/match/cancel/${uid}`, {
      method: 'GET',
    });
  };
}
