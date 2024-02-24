import { DirectMessageUserSocket } from './directMessageUserSocket';
import { Socket } from 'socket.io';

export class DirectMessageSocket {
    accessId: string;
    messages: any;
    userSocketsIds: Map<Socket, DirectMessageUserSocket>;//Socket(string)=>userSocket
}
