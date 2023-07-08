import { UserForLoginDto } from './../../../entities/dto/userForLoginDto';
import { Injectable } from '@nestjs/common';
import { ErrorDataResult } from 'src/core/utilities/result/concrete/dataResult/errorDataResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { User } from 'src/entities/concrete/user.entity';
import { UserForRegisterDto } from 'src/entities/dto/userForRegisterDto';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { UserService } from '../user/user.service';
import { HashingHelper } from 'src/core/utilities/security/hashing/hashingHelper';
import { AccessToken } from 'src/core/utilities/security/jwt/accessToken';
import { JwtHelper } from 'src/core/utilities/security/jwt/jwtHelper';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly hashingHelper: HashingHelper,
    private readonly tokenHelper: JwtHelper,
  ) {}

  public async register(
    userForRegisterDto: UserForRegisterDto,
    password: string,
  ): Promise<IDataResult<User>> {
    const { passwordHash, passwordSalt } =
      await this.hashingHelper.createPasswordHash(password);

    const user: User = {
      email: userForRegisterDto.email,
      verificationcode: 'emailVerifCode',
      firstname: userForRegisterDto.firstName,
      lastname: userForRegisterDto.lastName,
      nickname: userForRegisterDto.nickName,
      passwordhash: passwordHash,
      passwordsalt: passwordSalt,
      address: '',
      isverified: false,
      phone: '',
      updatetime: new Date(),
      status: true,
      id: 0,
      explanation: '',
    };

    const successResult = await this.userService.add(user);

    if (!successResult.success)
      return new ErrorDataResult<User>(user, 'successResult.Message');

    return new SuccessDataResult<User>(user, 'Messages.UserRegistered');
  }

  public async login(
    userForLoginDto: UserForLoginDto,
  ): Promise<IDataResult<User>> {
    const userToCheck = (
      await this.userService.getByMail(userForLoginDto.email)
    ).data;
    if (!userToCheck) {
      return new ErrorDataResult<User>(null, 'Messages.UserNotFound');
    }

    const isPasswordValid = await this.hashingHelper.verifyPasswordHash(
      userForLoginDto.password,
      userToCheck.passwordhash,
      userToCheck.passwordsalt,
    );

    if (!isPasswordValid) {
      return new ErrorDataResult<User>(null, 'Messages.PasswordError');
    }

    return new SuccessDataResult<User>(userToCheck, 'Messages.SuccessfulLogin');
  }

  public async createAccessToken(
    user: User,
  ): Promise<IDataResult<AccessToken>> {
    const claims = this.userService.getClaims(user);
    const accessToken = this.tokenHelper.createToken(user, (await claims).data);
    return new SuccessDataResult<AccessToken>(
      accessToken,
      'Messages.AccessTokenCreated',
    );
  }
}
