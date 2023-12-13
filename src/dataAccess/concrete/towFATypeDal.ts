import { Repository } from 'typeorm';
import { Injectable } from "@nestjs/common";
import { TwoFAType } from 'src/entities/concrete/towFAType.entity';

@Injectable()
export class TwoFATypeDal extends Repository<TwoFAType> {

}