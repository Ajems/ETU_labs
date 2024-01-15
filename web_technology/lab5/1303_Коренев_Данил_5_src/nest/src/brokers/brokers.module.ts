import { Module } from '@nestjs/common';
import { BrokersService } from './brokers.service';
import { BrokersGateway } from './brokers.gateway';

@Module({
  providers: [BrokersGateway, BrokersService],
})
export class BrokersModule {}
