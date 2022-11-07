export default class ChattingRoomService {
  constructor(http) {
    this.http = http;
  }

  findByMatchId = async (matchId) => {
    return this.http.fetch(`/chattingroom/findbymatchid/${matchId}`, {
      method: 'GET',
    });
  };

  make = async (matchId, user1Id, user2Id) => {
    const data = await this.http.fetch('/chattingroom/make', {
      method: 'POST',
      body: JSON.stringify({
        matchId,
        user1Id,
        user2Id,
      }),
    });
    return data;
  };
  update = async (id, beforeMatchId) => {
    const data = await this.http.fetch('/chattingroom/update', {
      method: 'POST',
      body: JSON.stringify({
        id,
        beforeMatchId,
      }),
    });
    return data;
  };

  getOpponentUserData = async (roomId, uid) => {
    return await this.http.fetch(
      `/chattingroom/getopponentuserdata/${roomId}/${uid}`,
      {
        method: 'GET',
      }
    );
  };

  delete = async (roomId) => {
    return this.http.fetch(`/chattingroom/${roomId}`, {
      method: 'DELETE',
    });
  };
}
