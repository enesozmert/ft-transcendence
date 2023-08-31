import { UserService } from './../user/user.service';
import { GameRoomSocket } from './../../../entities/concrete/gameRoomSocket';
import { GameBaseSocket } from '../../../entities/concrete/gameBaseSocket';
import { Injectable } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { GameConnectedUserSocket } from 'src/entities/concrete/gameConnectedUserSocket';
import { User } from 'src/entities/concrete/user.entity';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

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
        const disconnectedUser = this.findDisconnectedUser(client);

        if (disconnectedUser) {
            const index = this.connectedUserSocket.indexOf(disconnectedUser);
            if (index !== -1) {
                this.connectedUserSocket.splice(index, 1);
            }
        }
    }
    async handleConnection(client: Socket, ...args: any[]): Promise<boolean> {
        let token: string = client.handshake.auth.token;
        const decodedToken: any = jwt.decode(token);
        const nickName: any = decodedToken.claims.find((claim: { name: string; }) => claim.name === "nickName");

        if (!token) {
            client.disconnect(true);
            return false;
        }

        this.userSocket.set(nickName.value, { socket: client });
        this.connectedUserSocket.push({
            nickName: nickName.value,
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
        console.log("this.connectedUserSocket.length " + this.connectedUserSocket.length);

        let responseData = { message: 'Matchmaking Search' };
        socket.emit('matchmakingResponse', responseData);
        if (this.connectedUserSocket.length % 2 == 1) {
            await this.generateRoom(this.connectedUserSocket[this.connectedUserSocket.length - 1]);
            console.log("generaterx");
            console.log("this.gameRoomsSocket.length " + this.gameRoomsSocket.length);
            console.log("this.connectedUserSocket.length " + this.connectedUserSocket.length);
        }
        else if (this.connectedUserSocket.length % 2 == 0) {
            const message = await this.joinRoom(this.connectedUserSocket[this.connectedUserSocket.length - 1]);
            responseData = { message: message };
            console.log("joinRoomx");
        }
        setTimeout(() => {
            responseData = { message: 'Matchmaking Finish' };
        }, 100);
        // for (let i = 0; i < this.gameRoomsSocket.length; i++) {
        //     console.log("this.connectedUserSocket[i] userHostId " + this.gameRoomsSocket[i].userHostId);
        //     console.log("this.connectedUserSocket[i] userGuestId " + this.gameRoomsSocket[i]?.userGuestId);
        //     console.log("this.connectedUserSocket[i] userHostScore " + this.gameRoomsSocket[i].userHostScore);
        //     console.log("this.connectedUserSocket[i] userGuestScore " + this.gameRoomsSocket[i].userGuestScore);
        // }
    }

    //helper

    async generateRoom(gameConnectedUserSocket: GameConnectedUserSocket) {
        const userData = await this.userService.getByNickName(gameConnectedUserSocket.nickName);
        const user = userData.data;
        const newGameRoom: GameRoomSocket = {
            userHostId: user.id,
            userHostScore: 0,
            userGuestId: null,
            userGuestScore: 0,
            resultNameId: 0
        };

        this.gameRoomsSocket.push(newGameRoom);
    }

    async joinRoom(gameConnectedUserSocket: GameConnectedUserSocket): Promise<string> {
        const userData = await this.userService.getByNickName(gameConnectedUserSocket.nickName);
        const user = userData.data;

        for (let i = 0; i < this.gameRoomsSocket.length; i++) {
            if (this.gameRoomsSocket[i].userGuestId == null || this.gameRoomsSocket[i].userGuestId === undefined) {
                this.gameRoomsSocket[i].userGuestId = user.id;
                return "Matchmaking Join";
            }
        }
        return "Matchmaking Fail"
    }

    findDisconnectedUser(client: Socket): GameConnectedUserSocket | undefined {
        for (const user of this.connectedUserSocket) {
            if (user.socket === client) {
                return user;
            }
        }
        return undefined;
    }
}
