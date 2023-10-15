import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/business/const/messages';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { IResult } from 'src/core/utilities/result/abstract/iResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';
import { ChatRoomPropertyDal } from 'src/dataAccess/concrete/chatRoomPropertyDal';
import { ChatRoomProperty } from 'src/entities/concrete/chatRoomProperty.entity';

@Injectable()
export class ChatRoomPropertyService {
    constructor(@InjectRepository(ChatRoomProperty) private chatRoomPropertyDal: ChatRoomPropertyDal) {
        
    }

    public async getAll(): Promise<IDataResult<ChatRoomProperty[]>> {
		return new SuccessDataResult<ChatRoomProperty[]>(
			await this.chatRoomPropertyDal.find(),
			Messages.ChatRoomPropertyGetAll,
		);
	}

    public async getById(id: number): Promise<IDataResult<ChatRoomProperty>> {
		return new SuccessDataResult<ChatRoomProperty>(
			await this.chatRoomPropertyDal.findOne({ where: { id: id } }),
			Messages.ChatRoomPropertyGetById,
		);
	}
    
    public async add(chatRoomProperty: ChatRoomProperty): Promise<IDataResult<ChatRoomProperty>> {
		const addedChatRoomProperty = await this.chatRoomPropertyDal.save(chatRoomProperty);
		return new SuccessDataResult<ChatRoomProperty>(addedChatRoomProperty, Messages.ChatRoomPropertyAdded);
	}

	public async update(
		updatedChatRoomProperty: ChatRoomProperty,
	): Promise<IResult> {
		const user = await this.chatRoomPropertyDal.findOne({ where: { id: updatedChatRoomProperty.id } });
		if (!user) {
			return new ErrorResult(Messages.ChatRoomPropertyNotFound);
		}
		const mergedUser = this.chatRoomPropertyDal.merge(user, updatedChatRoomProperty);
		await this.chatRoomPropertyDal.save(mergedUser);
		return new SuccessResult(Messages.ChatRoomPropertyUpdate);
	}

	public async delete(id: number): Promise<IResult> {
		await this.chatRoomPropertyDal.delete(id);
		return new SuccessResult(Messages.ChatRoomPropertyDeleted);
	}
}
