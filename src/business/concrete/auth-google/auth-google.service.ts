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
        const UID = this.configService.get<string>('GOOGLE_AUTH_UID_LOGIN');
        const SECRET = this.configService.get<string>('GOOGLE_AUTH_SECRET_LOGIN');

        this.oauthClient = new google.auth.OAuth2(UID, SECRET);

        const { tokens } = await this.oauthClient.getToken(code);
        this.oauthClient.setCredentials(tokens);
        const oauth2 = google.oauth2({ version: 'v2', auth: this.oauthClient });
        const userInfo = await oauth2.userinfo.get();
        console.log("userInfo " + JSON.stringify(userInfo));
        return new SuccessDataResult<User>(null, Messages.SuccessfulLogin);
    }

    public async register(code: string): Promise<IDataResult<User>> {
        return new SuccessDataResult<User>(null, Messages.UserRegistered);
    }
}
