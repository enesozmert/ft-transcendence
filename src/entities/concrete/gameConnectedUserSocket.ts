import { Socket } from 'socket.io';
export class GameConnectedUserSocket {
  nickName: string;
  roomName: number;
  socket: Socket;
}
