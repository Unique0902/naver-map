export default class FindMatchingService {
  constructor(http) {
    this.http = http;
  }

  make = async (uid, slat, slng, alat, alng, srad, arad) => {
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
  check = async (id) => {
    return await this.http.fetch(`/findmatch/check/${id}`, {
      method: 'GET',
    });
  };
  cancel = async (uid) => {
    return await this.http.fetch(`/findmatch/cancel/${uid}`, {
      method: 'DELETE',
    });
  };
}
