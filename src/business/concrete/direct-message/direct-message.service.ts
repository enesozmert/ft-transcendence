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
@WebSocketGateway({
    cors: {
        origin: '*',
    },
    namespace: 'socket/direct-message',
})
@Injectable()
export class DirectMessageService implements OnGatewayConnection, OnGatewayDisconnect{
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

    handleDisconnect(client: any) {
        throw new Error('Method not implemented.');
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

        // this.connectedDirectMessageUserSockets.set(client, {
        //     nickName: nickName.value,
        //     chatRoomAccessId: "",
        //     socketId: client.id
        // });
        return true;
    }
}
