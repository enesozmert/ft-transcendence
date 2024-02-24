import { Module } from '@nestjs/common';
import { TwoFaService } from 'src/business/concrete/two-fa/two-fa.service';
import { TwoFasController } from 'src/controllers/two-fas/two-fas.controller';

@Module({
  imports: [],
  exports: [TwoFaService],
  controllers: [TwoFasController],
  providers: [TwoFaService],
})
export class TwoFaModule {}
