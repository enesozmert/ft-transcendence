import { TwoFAType } from './../../entities/concrete/towFAType.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwoFatypeService } from 'src/business/concrete/two-fatype/two-fatype.service';
import { TwoFatypesController } from 'src/controllers/two-fatypes/two-fatypes.controller';
import { TwoFATypeDal } from 'src/dataAccess/concrete/towFATypeDal';

@Module({
    imports: [
        TypeOrmModule.forFeature([TwoFAType]),
    ],
    exports: [TypeOrmModule, TwoFatypeService],
    controllers: [TwoFatypesController],
    providers: [TwoFatypeService, TwoFATypeDal],
})
export class TowFatypeModule { }
