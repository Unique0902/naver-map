export default class FindMatchingService {
  constructor(http) {
    this.http = http;
  }

  makeFindMatching = async (uid, slat, slng, alat, alng, srad, arad) => {
    const data = await this.http.fetch('/findmatch/make', {
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
  cancelFindMatching = async (uid) => {
    return await this.http.fetch(`/findmatch/cancel/${uid}`, {
      method: 'GET',
    });
  };
}
