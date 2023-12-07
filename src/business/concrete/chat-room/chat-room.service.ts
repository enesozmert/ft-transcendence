import { UserService } from './../user/user.service';
import { RandomHelper } from './../../../core/utilities/random/randomHelper';
import { BusinessRules } from './../../../core/utilities/business/businessRules';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
import { OperationClaim } from 'src/core/entities/concrete/operationClaim.entity';
import { OperationClaimDal } from 'src/dataAccess/concrete/operationClaimDal';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
    namespace: 'socket/chat-room',
})
@Injectable()
export class ChatRoomService implements OnGatewayConnection, OnGatewayDisconnect {
    connectedChatRoomUserSockets = new Map<Socket, ChatRoomUserSocket>();//socket=>user
    chatRoomSockets = new Map<string, ChatRoomSocket>();//socket=>user
    chatRoomListSockets = new Map<Socket, ChatRoomListSocket>();//socker=>chatRoomSocket

    @WebSocketServer()
    server: Server;

    constructor(@InjectRepository(ChatRoom) private chatRoomDal: ChatRoomDal,
        @InjectRepository(OperationClaim) private operationClaimDal: OperationClaimDal,
        private userService: UserService) {

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

    public async add(chatRoom: ChatRoom): Promise<IResult> {
        let accessId = RandomHelper.makeText(50);
        let result = BusinessRules.run(await this.checkIfAccessId(accessId));
        if (result != null)
            this.add(chatRoom);
        chatRoom.accessId = accessId;
        await this.chatRoomDal.save(chatRoom);
        return new SuccessResult(Messages.ChatRoomAdded);
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

    public async getByAccessId(accessId: string): Promise<IDataResult<ChatRoom>> {
        return new SuccessDataResult<ChatRoom>(
            await this.chatRoomDal.findOne({ where: { accessId: accessId } }),
            Messages.ChatRoomGetByAccessId,
        );
    }

    private async getChatRoomsByUser(): Promise<ChatRoomByUserDto[]> {
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

    public async getClaims(userId: number): Promise<IDataResult<OperationClaim[]>> {
        const user = await this.userService.getById(userId);
        const result = await this.operationClaimDal
            .createQueryBuilder('operationClaim')
            .innerJoin(
                'operationClaim.userOperationClaims',
                'userOperationClaim',
                'userOperationClaim.userId = :userId',
                { userId: user.data.id },
            )
            .select([
                'operationClaim.id',
                'operationClaim.name',
                'operationClaim.explanation',
                'operationClaim.description',
            ])
            .getMany();
        return new SuccessDataResult<OperationClaim[]>(result, Messages.UserGetClaims);
    }

    //bussiness
    private async checkIfAccessId(accessId: string): Promise<IResult> {
        let roomsCount: number = await this.chatRoomDal.count({ where: { accessId: accessId } });
        if (roomsCount == 0)
            return new SuccessResult();
        return new ErrorResult();
    }

    //socket

    handleDisconnect(client: any) {
        const disconnectedUserSocket = this.findDisconnectedUser(client);
        const findChatRoomSocket = this.findChatRoomSocket(client);

        if (disconnectedUserSocket) {
            const responseData = { message: 'true' };
            this.chatRoomSockets.delete(disconnectedUserSocket.chatRoomAccessId);
            this.connectedChatRoomUserSockets.delete(findChatRoomSocket);
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
            chatRoomAccessId: "",
            socketId: client.id
        });
        return true;
    }

    @SubscribeMessage('chatRoomConnected')
    async chatRoomConnected(@MessageBody() response: any, @ConnectedSocket() socket: Socket) {
        let userSocketsIds: Map<Socket, ChatRoomUserSocket>;
        let chatRoomListSocket: ChatRoomListSocket;
        let chatRoomSocket: ChatRoomSocket;
        let connectedUserSocket: ChatRoomUserSocket;
        let accessId;

        connectedUserSocket = this.connectedChatRoomUserSockets.get(socket);
        accessId = response.data;
        connectedUserSocket.chatRoomAccessId = accessId;

        if (!this.chatRoomSockets.has(accessId)) {
            userSocketsIds = new Map<Socket, ChatRoomUserSocket>();
            userSocketsIds.set(socket, connectedUserSocket);
            chatRoomSocket = {
                accessId: accessId,
                userSocketsIds: userSocketsIds
            };
            chatRoomSocket.accessId = accessId;
            this.chatRoomSockets.set(accessId, chatRoomSocket);
        } else {
            let chatRoomSocketOld: ChatRoomSocket = this.chatRoomSockets.get(accessId);
            if (!chatRoomSocketOld.userSocketsIds.has(socket)) {
                chatRoomSocketOld.userSocketsIds.set(socket, connectedUserSocket);
                this.chatRoomSockets.set(accessId, chatRoomSocketOld);
            }
        }

        if (!this.chatRoomListSockets.has(accessId)) {
            chatRoomListSocket = {
                chatRoomSocketsIds: new Map<string, ChatRoomSocket>(),
            };
        } else {
            chatRoomListSocket = this.chatRoomListSockets.get(accessId);
        }

        chatRoomListSocket.chatRoomSocketsIds.set(accessId, chatRoomSocket);
        this.chatRoomListSockets.set(accessId, chatRoomListSocket);
        console.log("this.chatRoomSockets1 ", this.connectedChatRoomUserSockets.size);

    }

    @SubscribeMessage('chatRoomHandleMessage')
    async chatRoomHandleMessage(@MessageBody() response: any, @ConnectedSocket() socket: Socket) {
        let responseData = { message: 'Message Text', data: response.data.messages };
        this.sendBroadcast("messageResponse", this.chatRoomSockets.get(response.data.accessId).userSocketsIds, responseData);
    }

    @SubscribeMessage('chatRoomHandleOperations')
    async chatRoomHandleOperations(@MessageBody() response: any, @ConnectedSocket() socket: Socket) {
        let responseData = { message: 'Message Text', data: response.data.operations };
        this.sendBroadcast("operationResponse", this.chatRoomSockets.get(response.data.accessId).userSocketsIds, responseData);
    }

    @SubscribeMessage('chatRoomHandlePlayer')
    async chatRoomHangleMove(@MessageBody() response: any, @ConnectedSocket() socket: Socket) {
        let responseData = { message: 'Player', data: response.data.playerTotalArray };
        this.sendBroadcast("playerResponse", this.chatRoomSockets.get(response.data.accessId).userSocketsIds, responseData);
    }

    //move-ex

    //utils

    findDisconnectedUser(client: Socket): ChatRoomUserSocket | undefined {
        for (const user of this.connectedChatRoomUserSockets.values()) {
            if (user.socketId === client.id) {
                return this.connectedChatRoomUserSockets.get(client);
            }
        }
        return undefined;
    }

    findChatRoomSocket(client: Socket): Socket | undefined {
        for (const user of this.connectedChatRoomUserSockets.values()) {
            if (user.socketId === client.id) {
                return client;
            }
        }
        return undefined;
    }


    //mapBroadcast
    async sendBroadcast(ev: string, sockets: Map<Socket, ChatRoomUserSocket>, responseData: any) {
        console.log("responseData ", responseData);

        for (const iterator of sockets) {
            const element = iterator[0];
            element.emit(ev, responseData);
        }
    }
}