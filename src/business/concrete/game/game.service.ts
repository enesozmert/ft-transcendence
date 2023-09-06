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
      this.connectedUserSocket.delete(disconnectedUser.nickName);
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
    console.log('data ' + data.speed);
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
      // socket.emit('matchmakingResponse', responseData);
      this.sendMessageRoom(lastRoom, responseData);
      setTimeout(() => {
        responseData = { message: 'Matchmaking Finish' };
        this.sendMessageRoom(lastRoom, responseData);
      }, 1000);
      console.log('joinRoomx');
    }
    // for (let i = 0; i < this.gameRoomsSocket.length; i++) {
    //     console.log("this.connectedUserSocket[i] userHostId " + this.gameRoomsSocket[i].userHostId);
    //     console.log("this.connectedUserSocket[i] userGuestId " + this.gameRoomsSocket[i]?.userGuestId);
    //     console.log("this.connectedUserSocket[i] userHostScore " + this.gameRoomsSocket[i].userHostScore);
    //     console.log("this.connectedUserSocket[i] userGuestScore " + this.gameRoomsSocket[i].userGuestScore);
    // }
  }

  //helper

  async sendMessageRoom(gameRoomSocket: any, responseData: any) {
    for (const iterator of this.connectedUserSocket) {
      if (iterator[1].roomName == gameRoomSocket[0]) {
        iterator[1].socket.emit('matchmakingResponse', responseData);
      }
    }
  }

  async generateRoom(gameConnectedUserSocket: GameConnectedUserSocket) {
    const userData = await this.userService.getByNickName(
      gameConnectedUserSocket.nickName,
    );
    const user = userData.data;

    const newGameRoom: GameRoomSocket = {
      userHostId: user.id,
      userHostScore: 0,
      userGuestId: null,
      userGuestScore: 0,
      resultNameId: 0,
    };

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
