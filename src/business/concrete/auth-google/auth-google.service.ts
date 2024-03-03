import { RandomHelper } from 'src/core/utilities/random/randomHelper';
import { JwtHelper } from './../../../core/utilities/security/jwt/jwtHelper';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HashingHelper } from 'src/core/utilities/security/hashing/hashingHelper';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { User } from 'src/entities/concrete/user.entity';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { Messages } from 'src/business/const/messages';
import { ErrorDataResult } from 'src/core/utilities/result/concrete/dataResult/errorDataResult';
import { UserForRegisterDto } from 'src/entities/dto/userForRegisterDto';
import { UserForLoginDto } from 'src/entities/dto/userForLoginDto';
import { UserInfo } from 'src/entities/concrete/userInfo.entity';
import { UserInfoService } from '../user-info/user-info.service';

@Injectable()
export class AuthGoogleService {
  constructor(
    private userService: UserService,
    private userInfoService: UserInfoService,
    private authService: AuthService,
    private readonly configService: ConfigService,
    private readonly hashingHelper: HashingHelper,
    private readonly tokenHelper: JwtHelper,
  ) {}

  public async login(code: string): Promise<IDataResult<User>> {
    const userInfo = await this.baseGoogleAuth(code, 'login');
    const userForLoginDto: UserForLoginDto = {
      email: userInfo.email,
      password: String(userInfo.id + 'sifredeneme1453*0571*0630'),
    };
    const userToCheck = (
      await this.userService.getByMail(userForLoginDto.email)
    ).data;
    if (!userToCheck) {
      return new ErrorDataResult<User>(null, Messages.UserNotFound);
    }

    const isPasswordValid = await this.hashingHelper.verifyPasswordHash(
      userForLoginDto.password,
      userToCheck.passwordhash,
      userToCheck.passwordsalt,
    );

    if (!isPasswordValid) {
      return new ErrorDataResult<User>(null, Messages.PasswordError);
    }
    return new SuccessDataResult<User>(userToCheck, Messages.SuccessfulLogin);
  }

  public async register(code: string): Promise<IDataResult<User>> {
    const userInfoGoogle = await this.baseGoogleAuth(code, 'register');
    console.log('userInfo ' + JSON.stringify(userInfoGoogle));
    const password = String(userInfoGoogle.id + 'sifredeneme1453*0571*0630');
    const userForRegisterDto: UserForRegisterDto = {
      email: userInfoGoogle.email,
      password: password,
      firstName: String(userInfoGoogle.name).split(' ')[0],
      lastName: userInfoGoogle.family_name,
      nickName:
        String(userInfoGoogle.name).charAt(0) +
        String(userInfoGoogle.family_name) +
        RandomHelper.makeText(10),
    };
    const userExists = this.authService.userExists(userForRegisterDto);
    if (!(await userExists).success) {
      return new ErrorDataResult<User>(null, (await userExists).message);
    }
    const result = await this.authService.register(
      userForRegisterDto,
      password,
    );
    let userInfo: UserInfo = {
      id: 0,
      userId: result.data.id,
      loginDate: new Date(),
      profileCheck: true,
      profileImagePath: '',
      profileText: '',
      gender: false,
      birthdayDate: new Date(),
    };
    await this.userInfoService.add(userInfo);
    return new SuccessDataResult<User>(result.data, Messages.UserRegistered);
  }

  private async baseGoogleAuth(
    code: string,
    loginOrRegister: string,
  ): Promise<any> {
    const UID = this.configService.get<string>('GOOGLE_AUTH_UID');
    const SECRET = this.configService.get<string>('GOOGLE_AUTH_SECRET');

    const API_URL = 'https://oauth2.googleapis.com';
    const form = new URLSearchParams();
    form.append('grant_type', 'authorization_code');
    form.append('code', code);
    form.append('client_id', UID as string);
    form.append('client_secret', SECRET as string);
    form.append(
      'redirect_uri',
      'http://localhost:3000/api/auth-google/' + loginOrRegister,
    );

    const responseToken = await fetch(API_URL + '/token', {
      method: 'POST',
      body: form,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    const dataToken = await responseToken.json();

    const userInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
    const userInfoHeaders = {
      Authorization: `Bearer ${dataToken.access_token}`,
    };
    const responseUserInfo = await fetch(userInfoUrl, {
      headers: userInfoHeaders,
    });
    const userInfo = await responseUserInfo.json();
    return userInfo;
  }
}
