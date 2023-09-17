import { UserService } from './../user/user.service';
import { GameRoomSocket } from './../../../entities/concrete/gameRoomSocket';
import { GameBaseSocket } from '../../../entities/concrete/gameBaseSocket';
import { Injectable } from '@nestjs/common';
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
import * as jwt from 'jsonwebtoken';
import { GameConnectedUserSocket } from 'src/entities/concrete/gameConnectedUserSocket';
import { User } from 'src/entities/concrete/user.entity';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'socket/game',
})
@Injectable()
export class GameService implements OnGatewayConnection, OnGatewayDisconnect {
  userSocket = new Map<string, { socket: Socket }>();
  connectedUserSocket = new Map<string, GameConnectedUserSocket>();
  gamebaseSocket = new Map<number, GameBaseSocket>();
  gameRoomsSocket = new Map<number, GameRoomSocket>();
  nextRoomId = 1;

  @WebSocketServer()
  server: Server;

  constructor(private userService: UserService) {}

  async handleDisconnect(client: Socket) {
    const disconnectedUser = this.findDisconnectedUser(client);

    if (disconnectedUser) {
      const responseData = { message: 'true' };
      disconnectedUser.socket.emit('gameDisconnected', responseData);
      this.userSocket.delete(disconnectedUser.nickName);
      this.connectedUserSocket.delete(disconnectedUser.nickName);
      this.gameRoomsSocket.delete(this.nextRoomId);
      console.log('disconnect user');
    }
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<boolean> {
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

    this.userSocket.set(nickName.value, { socket: client });
    this.connectedUserSocket.set(nickName.value, {
      nickName: nickName.value,
      socket: client,
      roomName: -1,
    });
    return true;
  }

  @SubscribeMessage('keydown')
  async keyDown(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    console.log('paddle host : ' + data.x);
    console.log('paddle guest : ' + data.x);
  }

  @SubscribeMessage('game')
  async location(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    console.log('data.x ' + data.x);
    console.log('data.y ' + data.y);
  }

  @SubscribeMessage('matchmaking')
  async matchmaking(
    @MessageBody() data: any,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(
      'this.connectedUserSocket.length ' + this.connectedUserSocket.size,
    );
    let lastConnectedUser: [string, GameConnectedUserSocket] | undefined;
    let lastRoom: [number, GameRoomSocket] | undefined;

    let responseData = { message: 'Matchmaking Search' };
    socket.emit('matchmakingResponse', responseData);
    this.connectedUserSocket.forEach((value, key) => {
      lastConnectedUser = [key, value];
    });
    this.gameRoomsSocket.forEach((value, key) => {
      lastRoom = [key, value];
    });
    if (this.connectedUserSocket.size % 2 == 1) {
      await this.generateRoom(lastConnectedUser[1]);
      lastConnectedUser[1].roomName = this.nextRoomId;
      this.connectedUserSocket.set(lastConnectedUser[0], lastConnectedUser[1]);
      console.log('generaterx');
      console.log('this.gameRoomsSocket.length ' + this.gameRoomsSocket.size);
      console.log(
        'this.connectedUserSocket.length ' + this.connectedUserSocket.size,
      );
    } else if (this.connectedUserSocket.size % 2 == 0) {
      const message = await this.joinRoom(lastConnectedUser[1]);
      lastConnectedUser[1].roomName = this.nextRoomId;
      this.connectedUserSocket.set(lastConnectedUser[0], lastConnectedUser[1]);
      responseData = { message: message };
      setTimeout(() => {
        responseData = { message: 'Matchmaking Finish' };
        this.sendMessageRoom('matchmakingResponse', lastRoom, responseData);
        this.sendMessageRoom('gameRoomId', lastRoom, {
          message: String(lastRoom[0]),
        });
      }, 1000);
      console.log('joinRoomx');
    }
  }

  //helper

  async sendMessageRoom(ev: string, gameRoomSocket: any, responseData: any) {
    gameRoomSocket[1].sockets[0].emit(ev, responseData);
    gameRoomSocket[1].sockets[1].emit(ev, responseData);
  }

  async generateRoom(gameConnectedUserSocket: GameConnectedUserSocket) {
    const userData = await this.userService.getByNickName(
      gameConnectedUserSocket.nickName,
    );
    const user = userData.data;
    const sockets: Array<Socket> = new Array<Socket>();
    const newGameRoom: GameRoomSocket = {
      userHostId: user.id,
      userHostScore: 0,
      userGuestId: null,
      userGuestScore: 0,
      resultNameId: 0,
      sockets: sockets,
    };
    sockets.push(gameConnectedUserSocket.socket);
    this.gameRoomsSocket.set(++this.nextRoomId, newGameRoom);
  }

  async joinRoom(
    gameConnectedUserSocket: GameConnectedUserSocket,
  ): Promise<string> {
    const userData = await this.userService.getByNickName(
      gameConnectedUserSocket.nickName,
    );
    const user = userData.data;
    for (const [roomId, room] of this.gameRoomsSocket.entries()) {
      if (!room.userGuestId) {
        room.userGuestId = user.id;
        room.sockets.push(gameConnectedUserSocket.socket);
        this.gameRoomsSocket.set(roomId, room);
        return 'Matchmaking Join';
      }
    }
    return 'Matchmaking Fail';
  }

  findDisconnectedUser(client: Socket): GameConnectedUserSocket | undefined {
    for (const user of this.connectedUserSocket.values()) {
      if (user.socket === client) {
        return user;
      }
    }
    return undefined;
  }
}
