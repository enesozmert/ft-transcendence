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

@Injectable()
export class ChatRoomUserService {
    constructor(@InjectRepository(ChatRoomUser) private chatRoomUserDal: ChatRoomUserDal) {
        
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

    public async add(chatRoomUser: ChatRoomUser): Promise<IDataResult<ChatRoomUser>> {
        const addedChatRoomUser = await this.chatRoomUserDal.save(chatRoomUser);
        return new SuccessDataResult<ChatRoomUser>(addedChatRoomUser, Messages.ChatRoomUserAdded);
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
}
