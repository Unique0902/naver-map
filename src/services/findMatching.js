export default class FindMatchingService {
  constructor(http) {
    this.http = http;
  }

  make = async (
    uid,
    slat,
    slng,
    alat,
    alng,
    srad,
    arad,
    startLoc,
    arriveLoc
  ) => {
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
        startLoc,
        arriveLoc,
      }),
    });
    return data;
  };
  check = async (id) => {
    return await this.http.fetch(`/findmatch/check/${id}`, {
      method: 'GET',
    });
  };
  take = async (id) => {
    return await this.http.fetch(`/findmatch/${id}`, {
      method: 'GET',
    });
  };
  end = async (uid) => {
    return await this.http.fetch(`/findmatch/end/${uid}`, {
      method: 'GET',
    });
  };
  cancel = async (uid) => {
    return await this.http.fetch(`/findmatch/cancel/${uid}`, {
      method: 'DELETE',
    });
  };
  cancelById = async (id) => {
    return await this.http.fetch(`/findmatch/cancelbyid/${id}`, {
      method: 'DELETE',
    });
  };
}
