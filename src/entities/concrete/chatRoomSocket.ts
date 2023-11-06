import { ChatRoomUserSocket } from './chatRoomUserSocket';
import { Socket } from 'socket.io';

export class ChatRoomSocket {
    accessId: string;
    userSocketsIds: Map<Socket, ChatRoomUserSocket>;//Socket(string)=>userSocket
}
