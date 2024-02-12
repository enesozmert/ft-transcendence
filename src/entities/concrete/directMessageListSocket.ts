import { DirectMessage } from './directMessage.entity';
import { DirectMessageSocket } from 'src/entities/concrete/DirectMessageSocket';
import { Socket } from 'socket.io';
export class DirectMessageListSocket {
    directMessageSocketsIds: Map<string, DirectMessageSocket>//SocketId(string)=>ChatRoomSocket
}