import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/concrete/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserDal extends Repository<User> {}
