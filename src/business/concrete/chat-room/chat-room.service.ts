import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { chat } from 'googleapis/build/src/apis/chat';
import { Messages } from 'src/business/const/messages';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { IResult } from 'src/core/utilities/result/abstract/iResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';
import { ChatRoomDal } from 'src/dataAccess/concrete/chatRoomDal';
import { ChatRoom } from 'src/entities/concrete/chatRoom.entity';
import { ChatRoomListSocket } from 'src/entities/concrete/chatRoomListSocket';
import { ChatRoomSocket } from 'src/entities/concrete/chatRoomSocket';
import { ChatRoomUserSocket } from 'src/entities/concrete/chatRoomUserSocket';
import { User } from 'src/entities/concrete/user.entity';
import { ChatRoomByUserDto } from 'src/entities/dto/chatRoomByUserDto';
import * as jwt from 'jsonwebtoken';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
    namespace: 'socket/chat-room',
})
@Injectable()
export class ChatRoomService implements OnGatewayConnection, OnGatewayDisconnect {
    connectedChatRoomUserSockets = new Map<Socket, ChatRoomUserSocket>();//socket=>user
    chatRoomSockets = new Map<Socket, ChatRoomSocket>();//socket=>user
    chatRoomListSockets = new Map<Socket, ChatRoomListSocket>();//socker=>chatRoomSocket

    @WebSocketServer()
    server: Server;

    constructor(@InjectRepository(ChatRoom) private chatRoomDal: ChatRoomDal) {

    }

    public async getAll(): Promise<IDataResult<ChatRoom[]>> {
        return new SuccessDataResult<ChatRoom[]>(
            await this.chatRoomDal.find(),
            Messages.ChatRoomGetAll,
        );
    }

    public async getById(id: number): Promise<IDataResult<ChatRoom>> {
        return new SuccessDataResult<ChatRoom>(
            await this.chatRoomDal.findOne({ where: { id: id } }),
            Messages.ChatRoomGetById,
        );
    }

    public async add(chatRoom: ChatRoom): Promise<IDataResult<ChatRoom>> {
        const addedChatRoom = await this.chatRoomDal.save(chatRoom);
        return new SuccessDataResult<ChatRoom>(addedChatRoom, Messages.ChatRoomAdded);
    }

    public async update(updatedChatRoom: ChatRoom): Promise<IResult> {
        const user = await this.chatRoomDal.findOne({ where: { id: updatedChatRoom.id } });
        if (!user) {
            return new ErrorResult(Messages.ChatRoomNotFound);
        }
        const mergedUser = this.chatRoomDal.merge(user, updatedChatRoom);
        await this.chatRoomDal.save(mergedUser);
        return new SuccessResult(Messages.ChatRoomUpdate);
    }

    public async delete(id: number): Promise<IResult> {
        await this.chatRoomDal.delete(id);
        return new SuccessResult(Messages.ChatRoomAdded);
    }

    async getChatRoomsByUser(): Promise<ChatRoomByUserDto[]> {
        const chatRooms = await this.chatRoomDal
            .createQueryBuilder('chatRoom')
            .innerJoin(User, 'user', 'user.id = chatRoom.roomUserId')
            .select([
                'chatRoom.id as "id"',
                'chatRoom.name as "name"',
                'chatRoom.accessId as "accessId"',
                'chatRoom.roomTypeId as "roomTypeId"',
                'chatRoom.roomUserId as "roomUserId"',
                'user.nickName as "userNickName"',
                'user.firstName as "userName"',
                'chatRoom.userCount as "userCount"',
                'chatRoom.hasPassword as "hasPassword"',
                'chatRoom.updateTime as "updateTime"',
                'chatRoom.status as "status"',
            ])
            .getRawMany();

        return chatRooms;
    }

    public async getRoomsByUserDto(): Promise<IDataResult<ChatRoomByUserDto[]>> {
        const result = await this.getChatRoomsByUser();
        return new SuccessDataResult<ChatRoomByUserDto[]>(result, Messages.GetRoomsByUserDto)
    }

    //socket

    handleDisconnect(client: any) {
        const disconnectedUserSocket = this.findDisconnectedUser(client);

        if (disconnectedUserSocket) {
            const responseData = { message: 'true' };
            this.chatRoomModelSocket.delete(disconnectedUserSocket);
            this.connectedChatRoomUserSocket.delete(disconnectedUserSocket);
            //   disconnectedUser.socket.emit('gameDisconnected', responseData);
            console.log('disconnect user');
        }
    }
    handleConnection(client: Socket, ...args: any[]) {
        client.id
        const token: string = client.handshake.auth.token;
        let decodedToken: any = '';
        let nickName: any = '';

        if (!token) {
            client.disconnect(true);
            return false;
        }

        decodedToken = jwt.decode(token);
        nickName = decodedToken.claims.find(
            (claim: { name: string }) => claim.name === 'nickName',
        );

        this.connectedChatRoomUserSockets.set(client, {
            nickName: nickName.value,
            socketId: client.id
        });
        return true;
    }

    @SubscribeMessage('chatRoomConnected')
    async chatRoomConnected(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
        let responseData = { message: 'Ball Location', data: data };
        this.sendBroadcast("ballLocationResponse", socket, responseData);
    }

    @SubscribeMessage('chatRoomSendMessage')
    async chatRoomSendMessage(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {

    }

    @SubscribeMessage('chatRoomHandleMessage')
    async chatRoomHandleMessage(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {

    }

    //move-ex.

    //utils

    findDisconnectedUser(client: Socket): Socket | undefined {
        for (const user of this.connectedChatRoomUserSockets.values()) {
            if (user.socketId === client.id) {
                return client;
            }
        }
        return undefined;
    }

    // findChatRoomSocket(socketId: string): Socket | undefined {
    //     for (const user of this.chatRoomModelSocket.values()) {
    //         if (user.chatRoomSocket.id === socketId) {
    //             return user.chatRoomSocket;
    //         }
    //     }
    //     return undefined;
    // }


    //mapBroadcast
    async sendBroadcast(ev: string, targetSocket: Socket, responseData: any) {
        // for (let index = 0; index < sockets.size; index++) {
        //   const element = sockets[index];
        //   element.emit(ev, responseData);
        // }
        
        // const currentChatRoom: ChatRoomSocket | undefined = this.chatRoomSockets.get(targetSocket);
        // for (let index = 0; index < currentChatRoom.userSocketsIds.; index++) {
        //     // const element = array[index];
            
        // } 
        // console.log(currentChatRoom);
        
    }
}