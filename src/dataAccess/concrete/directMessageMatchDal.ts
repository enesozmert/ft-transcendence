import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DirectMessageMatch } from 'src/entities/concrete/directMessageMatch.entity';

@Injectable()
export class DirectMessageMatchDal extends Repository<DirectMessageMatch> {

}