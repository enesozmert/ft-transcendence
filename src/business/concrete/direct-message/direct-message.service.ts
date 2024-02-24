import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/business/const/messages';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { IResult } from 'src/core/utilities/result/abstract/iResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';
import { DirectMessageDal } from 'src/dataAccess/concrete/directMessageDal';
import { DirectMessage } from 'src/entities/concrete/directMessage.entity';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import * as jwt from 'jsonwebtoken';
import { Server, Socket } from 'socket.io';
import { DirectMessageUserSocket } from 'src/entities/concrete/directMessageUserSocket';
import { DirectMessageSocket } from 'src/entities/concrete/directMessageSocket';
import { DirectMessageListSocket } from 'src/entities/concrete/directMessageListSocket';
import { GenerateGuid } from 'src/core/utilities/guid/generateGuid';
import { log } from 'console';
@WebSocketGateway({
    cors: {
        origin: '*',
    },
    namespace: 'socket/direct-message',
})
@Injectable()
export class DirectMessageService implements OnGatewayConnection, OnGatewayDisconnect {
    connectedDirectMessageUserSockets = new Map<Socket, DirectMessageUserSocket>();//socket=>user
    directMessageSockets = new Map<string, DirectMessageSocket>();//socket=>user
    directMessageListSockets = new Map<Socket, DirectMessageListSocket>();//socker=>chatRoomSocket
    @WebSocketServer()
    server: Server;

    constructor(@InjectRepository(DirectMessage) private directMessageDal: DirectMessageDal) {

    }

    public async getAll(): Promise<IDataResult<DirectMessage[]>> {
        return new SuccessDataResult<DirectMessage[]>(
            await this.directMessageDal.find(),
            Messages.DirectMessageGetAll,
        );
    }

    public async getById(id: number): Promise<IDataResult<DirectMessage>> {
        return new SuccessDataResult<DirectMessage>(
            await this.directMessageDal.findOne({ where: { id: id } }),
            Messages.DirectMessageGetById,
        );
    }

    public async add(directMessageMatch: DirectMessage): Promise<IDataResult<DirectMessage>> {
        const addedDirectMessage = await this.directMessageDal.save(directMessageMatch);
        return new SuccessDataResult<DirectMessage>(addedDirectMessage, Messages.DirectMessageAdded);
    }

    public async update(updatedDirectMessage: DirectMessage): Promise<IResult> {
        const match = await this.directMessageDal.findOne({ where: { id: updatedDirectMessage.id } });
        if (!match) {
            return new ErrorResult(Messages.DirectMessageNotFound);
        }
        const mergedMatch = this.directMessageDal.merge(match, updatedDirectMessage);
        await this.directMessageDal.save(mergedMatch);
        return new SuccessResult(Messages.DirectMessageUpdate);
    }
    public async delete(id: number): Promise<IResult> {
        await this.directMessageDal.delete(id);
        return new SuccessResult(Messages.DirectMessageDeleted);
    }

    public async addAll(directMessageMatch: DirectMessage[]): Promise<IResult> {
        const addedDirectMessage = await this.directMessageDal.save(directMessageMatch);
        return new SuccessResult(Messages.DirectMessageAdded);
    }

    public async getAllByUserId(userId: number): Promise<IDataResult<DirectMessage[]>> {
        return new SuccessDataResult<DirectMessage[]>(
            await this.directMessageDal.find({ where: { senderId: userId } }),
            Messages.DirectMessageGetAllByUserId,
        );
    }

    handleDisconnect(client: any) {
        const disconnectedUserSocket = this.findDisconnectedUser(client);
        const findDirectMessageSocket = this.findDirectMessageSocket(client);

        if (disconnectedUserSocket) {
            const responseData = { message: 'true' };
            this.directMessageSockets.delete(disconnectedUserSocket.accessId);
            this.connectedDirectMessageUserSockets.delete(findDirectMessageSocket);
            //   disconnectedUser.socket.emit('gameDisconnected', responseData);
            console.log('disconnect user');
        }
    }

    handleConnection(client: any, ...args: any[]) {
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

        this.connectedDirectMessageUserSockets.set(client, {
            nickName: nickName.value,
            accessId: "",
            socketId: client.id
        });
        return true;
    }

    @SubscribeMessage('directMessageConnected')
    async chatRoomConnected(@MessageBody() response: any, @ConnectedSocket() socket: Socket) {
        let userSocketsIds: Map<Socket, DirectMessageUserSocket>;
        let directMessageListSocket: DirectMessageListSocket;
        let directMessageSocket: DirectMessageSocket;
        let connectedUserSocket: DirectMessageUserSocket;
        let accessId;

        connectedUserSocket = this.connectedDirectMessageUserSockets.get(socket);
        accessId = response.data;
        connectedUserSocket.accessId = accessId;

        if (!this.directMessageSockets.has(accessId)) {
            userSocketsIds = new Map<Socket, DirectMessageUserSocket>();
            userSocketsIds.set(socket, connectedUserSocket);
            directMessageSocket = {
                accessId: accessId,
                messages: [],
                userSocketsIds: userSocketsIds
            };
            directMessageSocket.accessId = accessId;
            this.directMessageSockets.set(accessId, directMessageSocket);
        } else {
            let directMessageSocketOld: DirectMessageSocket = this.directMessageSockets.get(accessId);
            if (!directMessageSocketOld.userSocketsIds.has(socket)) {
                directMessageSocketOld.userSocketsIds.set(socket, connectedUserSocket);
                this.directMessageSockets.set(accessId, directMessageSocketOld);
            }
        }

        if (!this.directMessageListSockets.has(accessId)) {
            directMessageListSocket = {
                directMessageSocketsIds: new Map<string, DirectMessageSocket>(),
            };
        } else {
            directMessageListSocket = this.directMessageListSockets.get(accessId);
        }

        directMessageListSocket.directMessageSocketsIds.set(accessId, directMessageSocket);
        this.directMessageListSockets.set(accessId, directMessageListSocket);
        //response
        let responseData = { success: true, message: 'Users Connection Complated' };
        let userSocketIds = this.directMessageSockets.get(accessId).userSocketsIds;
        if (userSocketIds.size == 2) {
            this.sendBroadcast("usersConnectionComplatedResponse", this.directMessageSockets.get(accessId).userSocketsIds, responseData);
        } else {
            responseData.success = false;
            this.sendBroadcast("usersConnectionComplatedResponse", this.directMessageSockets.get(accessId).userSocketsIds, responseData);
        }
        // let messagesResponseData = { message: 'Message Text', data: this.directMessageSockets.get(accessId).messages };
        // console.log("this.directMessageSockets.get(accessId).messages ", this.directMessageSockets.get(accessId).messages);
        
        // this.sendBroadcast("messageResponse", this.directMessageSockets.get(accessId).userSocketsIds, messagesResponseData);
        console.log("this.chatRoomSockets1 ", this.connectedDirectMessageUserSockets.size);

    }


    @SubscribeMessage('getAccessId')
    async getAccessId(@MessageBody() response: any, @ConnectedSocket() socket: Socket) {
        const guid = GenerateGuid();
        let responseData = { message: 'Message Text', data: guid };
        this.sendBroadcast("messageResponse", this.directMessageSockets.get(response.data.accessId).userSocketsIds, responseData);
    }

    @SubscribeMessage('directMessageHandleMessage')
    async directMessageHandleMessage(@MessageBody() response: any, @ConnectedSocket() socket: Socket) {
        let responseData = { message: 'Message Text', data: response.data.messages };
        // let directMessageSocket = this.directMessageSockets.get(response.data.accessId);

        // directMessageSocket.messages = response.data.messages;
        this.sendBroadcast("messageResponse", this.directMessageSockets.get(response.data.accessId).userSocketsIds, responseData);
    }
    //utils

    findDisconnectedUser(client: Socket): DirectMessageUserSocket | undefined {
        for (const user of this.connectedDirectMessageUserSockets.values()) {
            if (user.socketId === client.id) {
                return this.connectedDirectMessageUserSockets.get(client);
            }
        }
        return undefined;
    }

    findDirectMessageSocket(client: Socket): Socket | undefined {
        for (const user of this.connectedDirectMessageUserSockets.values()) {
            if (user.socketId === client.id) {
                return client;
            }
        }
        return undefined;
    }


    //mapBroadcast
    async sendBroadcast(ev: string, sockets: Map<Socket, DirectMessageUserSocket>, responseData: any) {
        console.log("responseData ", responseData);

        for (const iterator of sockets) {
            const element = iterator[0];
            element.emit(ev, responseData);
        }
    }
}
