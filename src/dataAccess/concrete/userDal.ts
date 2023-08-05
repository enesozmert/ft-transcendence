import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/concrete/user.entity';
import { UserForProfileInfoDto } from 'src/entities/dto/userForProfileInfoDto';
import { Repository } from 'typeorm';

@Injectable()
export class UserDal extends Repository<User> {

    // async getUserProfileInfo(): Promise<UserForProfileInfoDto[]> {
    //     const usersWithInfo = await this
    //       .createQueryBuilder('user')
    //       .innerJoin(
    //         'user.userInfos',
    //         'info',
    //         'info.userId = user.id',
    //       )
    //       .select([
    //         'user.firstName',
    //         'user.lastName',
    //         'user.nickName',
    //         'info.profileText',
    //         'info.profileImagePath',
    //         'info.birthdayDate',
    //         'user.email',
    //       ])
    //       .getMany();
    
    //     return usersWithInfo.map(user => ({
    //       firstName: user.firstName,
    //       lastName: user.lastName,
    //       nickName: user.nickName,
    //       profileText: user.userInfos[0]?.profileText,
    //       profileImagePath: user.userInfos[0]?.profileImagePath,
    //       birthdayDate: user.userInfos[0]?.birthdayDate,
    //       email: user.email,
    //     }));
    //   }
}
