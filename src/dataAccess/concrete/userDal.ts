import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/concrete/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserDal extends Repository<User> {

    async userProfileInfoDto() {
        const usersWithInfo = await this
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.userInfo', 'info')
            .select([
                'user.firstName',
                'user.lastName',
                'user.nickName',
                'info.profileText',
                'info.profileImagePath',
                'info.birthdayDate',
                'info.email',
            ])
            .getMany();

        return usersWithInfo;
    }
}
