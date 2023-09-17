import { Socket } from 'socket.io';

export class GameRoomSocket {
  userHostId: number;
  userGuestId?: number;
  userHostScore: number;
  userGuestScore?: number;
  resultNameId: number;
  sockets: Array<Socket>;
}
