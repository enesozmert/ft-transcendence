import { ChatRoomService } from 'src/business/concrete/chat-room/chat-room.service';
import { AuthService } from './../auth/auth.service';
import { UserService } from './../user/user.service';
import { ErrorDataResult } from './../../../core/utilities/result/concrete/dataResult/errorDataResult';
import { BusinessRules } from './../../../core/utilities/business/businessRules';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/business/const/messages';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { IResult } from 'src/core/utilities/result/abstract/iResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';
import { ChatRoomUserDal } from 'src/dataAccess/concrete/chatRoomUserDal';
import { ChatRoomUser } from 'src/entities/concrete/chatRoomUser.entity';
import { User } from 'src/entities/concrete/user.entity';
import { AccessToken } from 'src/core/utilities/security/jwt/accessToken';
import { JwtHelper } from 'src/core/utilities/security/jwt/jwtHelper';
import { ChatRoom } from 'src/entities/concrete/chatRoom.entity';
import { ChatRoomUserByUserDto } from 'src/entities/dto/chatRoomUserByUserDto';

@Injectable()
export class ChatRoomUserService {
    constructor(@InjectRepository(ChatRoomUser) private chatRoomUserDal: ChatRoomUserDal,
        private chatRoomService: ChatRoomService) {

    }

    public async getAll(): Promise<IDataResult<ChatRoomUser[]>> {
        return new SuccessDataResult<ChatRoomUser[]>(
            await this.chatRoomUserDal.find(),
            Messages.ChatRoomUserGetAll,
        );
    }

    public async getById(id: number): Promise<IDataResult<ChatRoomUser>> {
        return new SuccessDataResult<ChatRoomUser>(
            await this.chatRoomUserDal.findOne({ where: { id: id } }),
            Messages.ChatRoomUserGetById,
        );
    }

    public async add(chatRoomUser: ChatRoomUser): Promise<IResult> {
        let result = BusinessRules.run(await this.checkIfUserIsHereByRoomId(chatRoomUser.chatRoomId, chatRoomUser.userId));
        if (result != null)
            return result;
        await this.chatRoomUserDal.save(chatRoomUser);
        return new SuccessResult(Messages.ChatRoomUserAdded);
    }

    public async update(updatedChatRoomUser: ChatRoomUser): Promise<IResult> {
        const user = await this.chatRoomUserDal.findOne({ where: { id: updatedChatRoomUser.id } });
        if (!user) {
            return new ErrorResult(Messages.ChatRoomUserNotFound);
        }
        const mergedUser = this.chatRoomUserDal.merge(user, updatedChatRoomUser);
        await this.chatRoomUserDal.save(mergedUser);
        return new SuccessResult(Messages.ChatRoomUserUpdate);
    }

    public async delete(id: number): Promise<IResult> {
        await this.chatRoomUserDal.delete(id);
        return new SuccessResult(Messages.ChatRoomUserDeleted);
    }

    private async getChatRoomUsersByUserAndChatRoomId(chatRoomId): Promise<ChatRoomUserByUserDto[]> {
        const queryBuilder = this.chatRoomUserDal
            .createQueryBuilder('chatRoomUser')
            .innerJoin(User, 'user', 'user.id = chatRoomUser.userId')
            .select([
                'chatRoomUser.id as "id"',
                'chatRoomUser.chatRoomId as "chatRoomId"',
                'chatRoomUser.userId as "userId"',
                'user.nickName as "nickName"',
                'chatRoomUser.updateTime as "updateTime"',
                'chatRoomUser.status as "status"',
            ])
            .where('chatRoomUser.chatRoomId = :chatRoomId', { chatRoomId });

        const chatRooms = await queryBuilder.getRawMany();

        return chatRooms;
    }

    public async getByAccessId(accessId: string): Promise<IDataResult<ChatRoomUser[]>> {
        let chatRoom: IDataResult<ChatRoom> = await this.chatRoomService.getByAccessId(accessId);
        return new SuccessDataResult<ChatRoomUser[]>(
            await this.getChatRoomUsersByUserAndChatRoomId(chatRoom.data.id),
            Messages.ChatRoomUserGetByAccessId,
        );
    }

    //bussines rules
    private async checkIfUserIsHereByRoomId(chatRoomId: number, userId: number): Promise<IResult> {
        const count = await this.chatRoomUserDal.count({
            where: { chatRoomId, userId },
        });
        if (count == 0)
            return new SuccessResult();
        return new ErrorResult(Messages.ChatRoomUserFound);
    }
}
