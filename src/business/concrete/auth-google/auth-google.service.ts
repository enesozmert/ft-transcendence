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
import { Auth, google } from 'googleapis';
import { ErrorDataResult } from 'src/core/utilities/result/concrete/dataResult/errorDataResult';
import { UserForRegisterDto } from 'src/entities/dto/userForRegisterDto';

@Injectable()
export class AuthGoogleService {
    private oauthClient: Auth.OAuth2Client;

    constructor(private userService: UserService,
        private authService: AuthService,
        private readonly configService: ConfigService,
        private readonly hashingHelper: HashingHelper,
        private readonly tokenHelper: JwtHelper) {
    }

    public async login(code: string): Promise<IDataResult<User>> {
        const UID = this.configService.get<string>('GOOGLE_AUTH_UID');
        const SECRET = this.configService.get<string>('GOOGLE_AUTH_SECRET');

        const API_URL = 'https://oauth2.googleapis.com';
        const form = new URLSearchParams();
        form.append('grant_type', 'authorization_code');
        form.append('code', code);
        form.append('client_id', UID as string);
        form.append('client_secret', SECRET as string);
        form.append('redirect_uri', 'http://localhost:3000/api/auth-google/login');

        const responseToken = await fetch(API_URL + '/token', {
            method: 'POST',
            body: form,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        const dataToken = await responseToken.json();

        const userInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
        const userInfoHeaders = { 'Authorization': `Bearer ${dataToken.access_token}` };
        const responseUserInfo = await fetch(userInfoUrl, { headers: userInfoHeaders });
        const userInfo = await responseUserInfo.json();
        console.log("userInfo " + JSON.stringify(userInfo));
        let password:string = String(userInfo.url + "sifredeneme");
        const userForRegisterDto: UserForRegisterDto = {
          email: userInfo.email,
          password: password,
          firstName: userInfo.first_name,
          lastName: userInfo.last_name,
          nickName: userInfo.login,
        };
        const userExists = this.authService.userExists(userForRegisterDto);
        if (!(await userExists).success) {
          return new ErrorDataResult<User>(null, (await userExists).message);
        }
        const result = await this.authService.register(
          userForRegisterDto,
          password,
        );
        return new SuccessDataResult<User>(null, Messages.UserRegistered);
    }

    public async register(code: string): Promise<IDataResult<User>> {
        return new SuccessDataResult<User>(null, Messages.UserRegistered);
    }
}
