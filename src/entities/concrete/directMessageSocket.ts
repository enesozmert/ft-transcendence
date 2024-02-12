import { DirectMessageUserSocket } from './directMessageUserSocket';
import { Socket } from 'socket.io';

export class DirectMessageSocket {
    accessId: string;
    userSocketsIds: Map<Socket, DirectMessageUserSocket>;//Socket(string)=>userSocket
}
