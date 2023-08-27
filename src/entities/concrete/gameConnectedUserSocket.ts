import { Socket } from 'socket.io';
export class GameConnectedUserSocket {
    nickName: string;
    roomName: string;
    socket: Socket;
}