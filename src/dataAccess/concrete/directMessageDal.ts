import { Injectable } from '@nestjs/common';
import { DirectMessage } from 'src/entities/concrete/directMessage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DirectMessageDal extends Repository<DirectMessage> {}