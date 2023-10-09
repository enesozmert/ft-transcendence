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
      this.userSocket.delete(disconnectedUser.nameIdentifier);
      this.connectedUserSocket.delete(disconnectedUser.nameIdentifier);
      this.gameRoomsSocket.delete(this.nextRoomId);
      disconnectedUser.socket.emit('gameDisconnected', responseData);
      console.log('disconnect user');
    }
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<boolean> {
    const token: string = client.handshake.auth.token;
    let decodedToken: any = '';
    let nameIdentifier: any = '';

    if (!token) {
      client.disconnect(true);
      return false;
    }

    decodedToken = jwt.decode(token);
    nameIdentifier = decodedToken.claims.find(
      (claim: { name: string }) => claim.name === 'nameIdentifier',
    );

    this.userSocket.set(nameIdentifier.value, { socket: client });
    this.connectedUserSocket.set(nameIdentifier.value, {
      nameIdentifier: nameIdentifier.value,
      socket: client,
      roomName: -1,
    });
    return true;
  }

  @SubscribeMessage('keydown')
  async keyDown(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    this.sendPaddleData(data, socket);
  }

  @SubscribeMessage('ballLocation')
  async ballLocation(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    let currentRoom: [number, GameRoomSocket] | undefined;
    const disconnectedUser = this.findDisconnectedUser(socket);

    currentRoom = this.findCurrentRoom(socket);
    if (currentRoom === undefined)
      return;
    let responseData = { message: 'Ball Location', data: data };
    this.sendBroadcast("ballLocationResponse", currentRoom[1].sockets, responseData);

    const nowDate = new Date();
    const date = (new Date(currentRoom[1].startTime).getTime() + currentRoom[1].timer * 1000) - nowDate.getTime();
    if (date <= 0){
      this.handleDisconnect(currentRoom[1].sockets[0]);
      this.handleDisconnect(currentRoom[1].sockets[1]);
      this.connectedUserSocket.delete(String(currentRoom[1].userHostId));
      this.connectedUserSocket.delete(String(currentRoom[1].userGuestId));
    }
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
          resultNameId: lastRoom[1].resultNameId,
          startTime: lastRoom[1].startTime,
          timer: lastRoom[1].timer,
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
    const sockets: Array<Socket> = new Array<Socket>();
    const newGameRoom: GameRoomSocket = {
      userHostId: Number(gameConnectedUserSocket.nameIdentifier),
      userHostScore: 0,
      userGuestId: null,
      userGuestScore: 0,
      resultNameId: 0,
      sockets: sockets,
      startTime: new Date(),
      timer: 10,
    };
    sockets.push(gameConnectedUserSocket.socket);
    this.gameRoomsSocket.set(++this.nextRoomId, newGameRoom);
  }

  async joinRoom(
    gameConnectedUserSocket: GameConnectedUserSocket,
  ): Promise<string> {
    for (const [roomId, room] of this.gameRoomsSocket.entries()) {
      if (!room.userGuestId) {
        room.userGuestId = Number(gameConnectedUserSocket.nameIdentifier);
        room.sockets.push(gameConnectedUserSocket.socket);
        this.gameRoomsSocket.set(roomId, room);
        return 'Matchmaking Join';
      }
    }
    return 'Matchmaking Fail';
  }

  sendPaddleData(data: any, socket: Socket): void {
    let currentRoom: [number, GameRoomSocket] | undefined;

    if (!data)
      return;
    if (!data.x || !data.y)
      return;
    currentRoom = this.findCurrentRoom(socket);
    if (currentRoom === undefined)
      return;
    if (data.whoIs == 0) {
      console.log("whoisd0");
      this.paddleArray[0] = data;
      console.log("paddledata socre0" + data.score);
    }
    if (data.whoIs == 1) {
      console.log("whoisd1");
      this.paddleArray[1] = data;
      const serializeData = JSON.stringify(this.paddleArray);
      let responseData = { message: 'Paddle', data: serializeData };
      // console.log("paddledata x" + data.x);
      // console.log("paddledata y" + data.y);
      // console.log("paddledata socre1" + data.score);
      this.sendBroadcast("paddleResponse", currentRoom[1].sockets, responseData);
    }
  }

  findDisconnectedUser(client: Socket): GameConnectedUserSocket | undefined {
    for (const user of this.connectedUserSocket.values()) {
      if (user.socket === client) {
        return user;
      }
    }
    return undefined;
  }

  findCurrentRoom(socket: Socket): [number, GameRoomSocket] | undefined{
    let nameIdentifier: string;
    let nameIdentifierNumber: number;
    let currentRoom: [number, GameRoomSocket] | undefined;

    for (const user of this.connectedUserSocket.values()) {
      if (user.socket === socket) {
        nameIdentifier = user.nameIdentifier;
      }
    }
    nameIdentifierNumber = Number(nameIdentifier);
    for (const room of this.gameRoomsSocket) {
      if (room[1].userHostId == nameIdentifierNumber || room[1].userGuestId == nameIdentifierNumber) {
        currentRoom = room;
      }
    }
    return currentRoom;
  }
}
