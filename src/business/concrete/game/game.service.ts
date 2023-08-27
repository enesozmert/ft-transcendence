import { GameSocketBase } from './../../../entities/concrete/gameSocketBase';
import { Injectable } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { GameConnectedUserSocket } from 'src/entities/concrete/gameConnectedUserSocket';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
    namespace: 'game'
})
@Injectable()
export class GameService implements OnGatewayConnection, OnGatewayDisconnect {
    userSocket = new Map<string, { socket: Socket }>();
    connectedUserSocket = new Map<string, GameConnectedUserSocket>();
    rooms = new Map<string, GameSocketBase>();
    @WebSocketServer()
    server: Server;

    handleDisconnect(client: Socket) {
        throw new Error('Method not implemented.');
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
        this.connectedUserSocket.set(client.id, {
            nickName: nickName,
            socket: client,
            roomName: "NULL"
        });
        return true;
    }
}
