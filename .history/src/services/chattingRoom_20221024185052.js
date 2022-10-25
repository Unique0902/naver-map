export default class ChattingRoomService {
  constructor(http) {
    this.http = http;
  }

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

  delete = async (roomId) => {
    return this.http.fetch(`/chattingroom/${roomId}`, {
      method: 'DELETE',
    });
  };
}
