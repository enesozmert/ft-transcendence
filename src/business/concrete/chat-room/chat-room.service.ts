import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/business/const/messages';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { IResult } from 'src/core/utilities/result/abstract/iResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';
import { ChatRoomDal } from 'src/dataAccess/concrete/chatRoomDal';
import { ChatRoom } from 'src/entities/concrete/chatRoom.entity';

@Injectable()
export class ChatRoomService {
    constructor(@InjectRepository(ChatRoom) private chatRoomDal: ChatRoomDal) {
        
    }

    public async getAll(): Promise<IDataResult<ChatRoom[]>> {
        return new SuccessDataResult<ChatRoom[]>(
            await this.chatRoomDal.find(),
            Messages.ChatRoomGetAll,
        );
    }

    public async getById(id: number): Promise<IDataResult<ChatRoom>> {
        return new SuccessDataResult<ChatRoom>(
            await this.chatRoomDal.findOne({ where: { id: id } }),
            Messages.ChatRoomGetById,
        );
    }

    public async add(chatRoom: ChatRoom): Promise<IDataResult<ChatRoom>> {
        const addedChatRoom = await this.chatRoomDal.save(chatRoom);
        return new SuccessDataResult<ChatRoom>(addedChatRoom, Messages.ChatRoomAdded);
    }

    public async update(updatedChatRoom: ChatRoom): Promise<IResult> {
        const user = await this.chatRoomDal.findOne({ where: { id: updatedChatRoom.id } });
        if (!user) {
            return new ErrorResult(Messages.ChatRoomNotFound);
        }
        const mergedUser = this.chatRoomDal.merge(user, updatedChatRoom);
        await this.chatRoomDal.save(mergedUser);
        return new SuccessResult(Messages.ChatRoomUpdate);
    }

    public async delete(id: number): Promise<IResult> {
        await this.chatRoomDal.delete(id);
        return new SuccessResult(Messages.ChatRoomAdded);
    }
}