import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrokersModule } from './brokers/brokers.module';
import { ControllerModule } from './controller/controller.module';
import { StocksModule } from './stocks/stocks.module';

@Module({
  imports: [StocksModule, ControllerModule, BrokersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
