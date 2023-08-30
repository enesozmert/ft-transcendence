import { UserService } from './../user/user.service';
import { GameRoomSocket } from './../../../entities/concrete/gameRoomSocket';
import { GameBaseSocket } from '../../../entities/concrete/gameBaseSocket';
import { Injectable } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { GameConnectedUserSocket } from 'src/entities/concrete/gameConnectedUserSocket';
import { User } from 'src/entities/concrete/user.entity';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
    namespace: 'socket/game'
})
@Injectable()
export class GameService implements OnGatewayConnection, OnGatewayDisconnect {
    userSocket = new Map<string, { socket: Socket }>();
    connectedUserSocket: Array<GameConnectedUserSocket>;
    gamebaseSocket: Array<GameBaseSocket>;
    gameRoomsSocket: Array<GameRoomSocket>;

    @WebSocketServer()
    server: Server;

    constructor(private userService: UserService) {
        this.gameRoomsSocket = new Array<GameRoomSocket>();
        this.connectedUserSocket = new Array<GameConnectedUserSocket>();
        this.gamebaseSocket = new Array<GameBaseSocket>();
    }

    async handleDisconnect(client: Socket) {
        // throw new Error('Method not implemented.');
    }
    async handleConnection(client: Socket, ...args: any[]): Promise<boolean> {
        let token: string = client.handshake.auth.token;
        const decodedToken: any = jwt.decode(token);
        const nickName: string = decodedToken.nickName;

        if (!token) {
            client.disconnect(true);
            return false;
        }

        this.userSocket.set(nickName, { socket: client });
        this.connectedUserSocket.push({
            nickName: nickName,
            socket: client,
            roomName: "NULL"
        });
        return true;
    }

    @SubscribeMessage('keydown')
    async keyDown(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
        console.log("paddle host : " + data.x);
        console.log("paddle guest : " + data.x);
    }

    @SubscribeMessage('game')
    async location(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
        console.log("data " + data.speed);
    }

    @SubscribeMessage('matchmaking')
    async matchmaking(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
        if (this.connectedUserSocket.length % 2 == 1){
            this.generateRoom(this.connectedUserSocket[this.connectedUserSocket.length - 1]);
        }
        else if (this.connectedUserSocket.length % 2 == 0){
            this.joinRoom(this.connectedUserSocket[this.connectedUserSocket.length - 1]);
        }
        console.log("data " + data.speed);
    }

    generateRoom(gameConnectedUserSocket:GameConnectedUserSocket) {
        let user:User;
        this.userService.getByNickName(gameConnectedUserSocket.nickName).then(res=>{
            user = res.data;
        });
        this.gameRoomsSocket.push({
            userHostId: user.id,
            userHostScore: 0,
            resultNameId: 0
        })
    }

    joinRoom(gameConnectedUserSocket:GameConnectedUserSocket){
        let user:User;
        this.userService.getByNickName(gameConnectedUserSocket.nickName).then(res=>{
            user = res.data;
            for (const res of this.gameRoomsSocket) {
                if (res.userGuestId == null || res.userGuestId === undefined) {
                    res.userGuestId = user.id;
                    break;
                }
            }
        });
    }
}
