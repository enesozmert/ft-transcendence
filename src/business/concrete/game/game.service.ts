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
  paddleArray = [2];
  nextRoomId = 1;

  @WebSocketServer()
  server: Server;

  constructor(private userService: UserService) { }

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
    this.sendPaddleData(data);
  }

  @SubscribeMessage('ballLocation')
  async ballLocation(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    let lastRoom: [number, GameRoomSocket];
    this.gameRoomsSocket.forEach((value, key) => {
      lastRoom = [key, value];
    });
    console.log("data " + data.x);
    console.log("data " + data.y);
    let responseData = { message: 'Ball Location', data: data };
    this.sendBroadcast("ballLocationResponse", lastRoom[1].sockets, responseData)
    // console.log('data.x ' + data.x);
    // console.log('data.y ' + data.y);
  }

  @SubscribeMessage('game')
  async game(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    // console.log('data.x ' + data.x);
    // console.log('data.y ' + data.y);
  }

  @SubscribeMessage('gameRoomSocket')
  async gameRoomSocket(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    let lastRoom: [number, GameRoomSocket] | undefined;
    this.gameRoomsSocket.forEach((value, key) => {
      lastRoom = [key, value];
    });


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

    let responseData = { message: 'Matchmaking Search', data: null };
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
      responseData = { message: message, data: null };
      setTimeout(() => {
        responseData = { message: 'Matchmaking Finish', data: null };
        this.sendMessageRoom('matchmakingResponse', lastRoom[1].sockets, responseData);
        this.sendMessageRoom('gameRoomId', lastRoom[1].sockets, {
          message: String(lastRoom[0]),
        });
      }, 1000);
      if (lastRoom) {
        let gameBaseSocketWithoutSockets = {
          userHostId: lastRoom[1].userHostId,
          userGuestId: lastRoom[1].userGuestId,
          userHostScore: lastRoom[1].userHostScore,
          userGuestScore: lastRoom[1].userGuestScore,
          resultNameId: lastRoom[1].resultNameId
        };
        const serializedGameBaseSocket = JSON.stringify(gameBaseSocketWithoutSockets);
        const responseData = { message: 'GameRoomSocketResponse Info', data: serializedGameBaseSocket };
        this.sendMessageRoom('gameRoomSocketResponse', lastRoom[1].sockets, responseData);
      }
      console.log('joinRoomx');
    }
  }

  //helper

  async sendMessageRoom(ev: string, sockets: Array<Socket>, responseData: any) {
    sockets[0].emit(ev, responseData);
    sockets[1].emit(ev, responseData);
  }

  async sendBroadcast(ev: string, sockets: Array<Socket>, responseData: any) {
    for (let index = 0; index < sockets.length; index++) {
      const element = sockets[index];
      element.emit(ev, responseData);
    }
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

  sendPaddleData(data:any): void{
    let lastRoom: [number, GameRoomSocket];
    this.gameRoomsSocket.forEach((value, key) => {
      lastRoom = [key, value];
    });
    if (data.whoIs == 0){
      this.paddleArray[0] = data;
    }
    if (data.whoIs == 1){
      this.paddleArray[1] = data;
    }
    const serializeData = JSON.stringify(data);
    let responseData = { message: 'Paddle', data: serializeData };
    console.log("paddledata x" + data.x);
    console.log("paddledata y" + data.y);
    this.sendBroadcast("paddleResponse", lastRoom[1].sockets, responseData);
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
