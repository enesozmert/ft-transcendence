import { User } from 'src/entities/concrete/user.entity';
import { Repository } from 'typeorm';

export class UserDal extends Repository<User> {}
