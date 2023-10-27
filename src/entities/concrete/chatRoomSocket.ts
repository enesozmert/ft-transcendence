import { ChatRoomUserSocket } from './chatRoomUserSocket';
import { Socket } from 'socket.io';

export class ChatRoomSocket {
    accessId: string;
    userSocketsIds: Map<string, ChatRoomUserSocket>;//Socket(string)=>userSocket
    chatRoomSocket: Socket
}
