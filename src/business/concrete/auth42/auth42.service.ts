import { Injectable, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client, ClientCredentialsTokenConfig, AccessToken } from 'simple-oauth2';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { User } from 'src/entities/concrete/user.entity';
import { Messages } from 'src/business/const/messages';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { UserForRegisterDto } from 'src/entities/dto/userForRegisterDto';
import { AuthService } from 'src/business/concrete/auth/auth.service';
import { UserService } from '../user/user.service';
import { ErrorDataResult } from 'src/core/utilities/result/concrete/dataResult/errorDataResult';

@Injectable()
export class Auth42Service {
    private readonly oauth2Client: OAuth2Client;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private readonly configService: ConfigService,
    ) {
    }

    public async register(code: string): Promise<IDataResult<User>> {
        const UID = this.configService.get<string>('42AUTH_UID');
        const SECRET = this.configService.get<string>('42AUTH_SECRET');
        const API_URL = 'https://api.intra.42.fr';
        const form = new FormData();
        form.append('grant_type', 'authorization_code');
        form.append('client_id', UID as string);
        form.append('client_secret', SECRET as string);
        form.append('code', code);
        form.append('redirect_uri', "http://localhost:3000/api/auth42/register");

        const responseToken = await fetch(API_URL + '/oauth/token', {
            method: 'POST',
            body: form
        });
        const dataToken = await responseToken.json();
        const responseInfo = await fetch('https://api.intra.42.fr/v2/me', {
            headers: {
                'Authorization': 'Bearer ' + dataToken.access_token
            }
        });
        const dataInfo = await responseInfo.json();
        console.log("responseInfo " + JSON.stringify(dataInfo));
        console.log("responseInfo " + dataInfo.email);
        const userForRegisterDto: UserForRegisterDto = {
            email: dataInfo.email,
            password: "123",
            firstName: dataInfo.first_name,
            lastName: dataInfo.last_name,
            nickName: dataInfo.login,
        };
        const userExists = this.authService.userExists(userForRegisterDto);
        if (!(await userExists).success) {
            return new ErrorDataResult<User>(null, Messages.UserRegistered);
        }
        const result = await this.authService.register(userForRegisterDto, "123");
        return new SuccessDataResult<User>(result.data, Messages.UserRegistered);
    }

    public async login(): Promise<IDataResult<User>> {
        return new SuccessDataResult<User>(null, Messages.UserLoggedIn); // Replace with appropriate implementation for login
    }
}
