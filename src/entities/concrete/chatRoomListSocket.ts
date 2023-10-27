import { ChatRoomSocket } from 'src/entities/concrete/chatRoomSocket';
import { Socket } from 'socket.io';
export class ChatRoomListSocket {
    chatRoomSocketsIds: Map<string, ChatRoomSocket>//SocketId(string)=>ChatRoomSocket
}