import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/concrete/user.entity';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { Messages } from 'src/business/const/messages';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';

@Injectable()
export class TwoFaService {
  async genereate(user: any): Promise<IDataResult<any>> {
      const secret = speakeasy.generateSecret({
        name: `FtTranscendence(${user.email})`
      });

      const secretBase32 = secret.base32;
      // QR kodu oluştur
      const qrCode = await QRCode.toDataURL(secret.otpauth_url);
      return new SuccessDataResult<any>(
          {secretBase32, secret, qrCode },
          Messages.TwoFATypeGetAll,
      );
  }

  async verify(userSecret: any, token: string): Promise<IDataResult<any>> {
    const isVerif = speakeasy.totp.verify({
      secret: userSecret,
      encoding: 'base32',
      token: token,
    });
    return new SuccessDataResult<any>(isVerif, Messages.TwoFAVerify);
  }
}
