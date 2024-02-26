import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserTwoFA } from 'src/entities/concrete/userTwoFa.entity';

@Injectable()
export class UserTwoFADal extends Repository<UserTwoFA> {}
