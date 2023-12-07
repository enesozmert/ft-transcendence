import { UserService } from './../user/user.service';
import { ChatRoomForLoginDto } from '../../../entities/dto/chatRoomForLoginDto';
import { ChatRoomService } from 'src/business/concrete/chat-room/chat-room.service';
import { Injectable } from '@nestjs/common';
import { HashingHelper } from 'src/core/utilities/security/hashing/hashingHelper';
import { JwtHelper } from 'src/core/utilities/security/jwt/jwtHelper';
import { ChatRoomForRegisterDto } from 'src/entities/dto/chatRoomForRegisterDto';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { ChatRoom } from 'src/entities/concrete/chatRoom.entity';
import { ErrorDataResult } from 'src/core/utilities/result/concrete/dataResult/errorDataResult';
import { Messages } from 'src/business/const/messages';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/concrete/user.entity';
import { AccessToken } from 'src/core/utilities/security/jwt/accessToken';

@Injectable()
export class ChatRoomAuthService {
    constructor(private chatRoomService: ChatRoomService,
		private userService: UserService,
        private readonly hashingHelper: HashingHelper,
        private readonly tokenHelper: JwtHelper,
    ) {

    }

    public async register(
        @InjectRepository(ChatRoom)
		chatRoomRegisterDto: ChatRoomForRegisterDto,
		password: string,
	): Promise<IDataResult<ChatRoom>> {
		const { passwordHash, passwordSalt } =
			await this.hashingHelper.createPasswordHash(password);
            let chatRoom: ChatRoom = {
                id : 0,
                name: chatRoomRegisterDto.name,
                accessId: chatRoomRegisterDto.accessId,
                roomTypeId: chatRoomRegisterDto.roomTypeId,
                roomUserId: chatRoomRegisterDto.roomUserId,
                userCount: chatRoomRegisterDto.userCount,
                hasPassword: chatRoomRegisterDto.hasPassword,
                passwordhash: passwordHash,
                passwordsalt: passwordSalt,
                updateTime: chatRoomRegisterDto.updateTime,
                status: chatRoomRegisterDto.status
            }
            const successResult = await this.chatRoomService.add(chatRoom);

		if (!successResult.success)
			return new ErrorDataResult<ChatRoom>(chatRoomRegisterDto, successResult.message);
		return new SuccessDataResult<ChatRoom>(chatRoomRegisterDto, Messages.UserRegistered);
	}

	public async login(
		chatRoomLoginDto: ChatRoomForLoginDto,
	): Promise<IDataResult<ChatRoom>> {
		const chatRoomToCheck = (
			await this.chatRoomService.getByAccessId(chatRoomLoginDto.accessId)
		).data;
		if (!chatRoomToCheck) {
			return new ErrorDataResult<ChatRoom>(null, Messages.UserNotFound);
		}

		const isPasswordValid = await this.hashingHelper.verifyPasswordHash(
			chatRoomLoginDto.password,
			chatRoomToCheck.passwordhash,
			chatRoomToCheck.passwordsalt,
		);

		if (!isPasswordValid) {
			return new ErrorDataResult<ChatRoom>(null, Messages.PasswordError);
		}

		return new SuccessDataResult<ChatRoom>(chatRoomToCheck, Messages.SuccessfulLogin);
	}

    public async createAccessToken(
		chatRoom: ChatRoom,
	): Promise<IDataResult<AccessToken>> {
		const claims = this.chatRoomService.getClaims(chatRoom.roomUserId);
		const user = this.userService.getById(chatRoom.roomUserId);
		const accessToken = this.tokenHelper.createToken((await user).data, (await claims).data);
		return new SuccessDataResult<AccessToken>(
			accessToken,
			Messages.AccessTokenCreated,
		);
	}

	// public async userExists(
	// 	userForRegisterDto: UserForRegisterDto,
	// ): Promise<IResult> {
	// 	const userByMail = await this.userService.getByMail(
	// 		userForRegisterDto.email,
	// 	);
	// 	if (userByMail.data !== null) {
	// 		return new ErrorResult(Messages.UserAlreadyExists);
	// 	}
	// 	const userNickName = await this.userService.getByNickName(
	// 		userForRegisterDto.nickName,
	// 	);
	// 	if (userNickName.data !== null) {
	// 		return new ErrorResult(Messages.UserAlreadyExists);
	// 	}
	// 	return new SuccessResult();
	// }
}
