import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksGateway } from './stocks.gateway';
import {ControllerService} from "../controller/controller.service";

@Module({
  controllers: [StocksGateway],
  providers: [StocksGateway, StocksService, ControllerService],
})
export class StocksModule {}
