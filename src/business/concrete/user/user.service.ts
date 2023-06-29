import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IResult } from 'src/core/utilities/result/abstract/IResult';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';
import { UserDal } from 'src/dataAccess/concrete/userDal';
import { User } from 'src/entities/concrete/user.entity';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userDal: UserDal) {}

  public async getAll(): Promise<IDataResult<User[]>> {
    return new SuccessDataResult<User[]>(
      await this.userDal.find(),
      'Message for user getall',
    );
  }

  public async getById(id: number): Promise<IDataResult<User>> {
    return await new SuccessDataResult<User>(
      await this.userDal.findOne({ where: { id: id } }),
      'Message for user betbyid',
    );
  }

  public async getByMail(email: string): Promise<IDataResult<User>> {
    return await new SuccessDataResult<User>(
      await this.userDal.findOne({ where: { email: email } }),
      'Message for user getbymail',
    );
  }

  public async add(user: User): Promise<IDataResult<User>> {
    const addedUser = await this.userDal.save(user);
    return new SuccessDataResult<User>(addedUser, 'User added');
  }

  public async update(
    id: number,
    updatedUser: Partial<User>,
  ): Promise<IResult> {
    const user = await this.userDal.findOne({ where: { id: id } });
    // if (!user) {
    //   throw new Error('User not found');
    // }
    const mergedUser = this.userDal.merge(user, updatedUser);
    await this.userDal.save(mergedUser);
    return new SuccessResult('User updated');
  }

  public async delete(id: number): Promise<IResult> {
    await this.userDal.delete(id);
    return new SuccessResult('User deleted');
  }
}
