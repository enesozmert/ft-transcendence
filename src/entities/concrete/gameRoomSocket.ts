import { Socket } from 'socket.io';

export class GameRoomSocket {
  userHostId: number;
  userGuestId?: number;
  userHostScore: number;
  userGuestScore?: number;
  resultNameId: number;
  startTime: Date;
  timer: number;
  speed: number;
  sockets: Array<Socket>;
}
