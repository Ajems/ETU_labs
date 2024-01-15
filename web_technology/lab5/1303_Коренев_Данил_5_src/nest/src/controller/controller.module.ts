import { Module } from '@nestjs/common';
import { ControllerService } from './controller.service';
import { ControllerGateway } from './controller.gateway';

@Module({
  controllers: [ControllerGateway],
  providers: [ControllerGateway, ControllerService],
})
export class ControllerModule {}
