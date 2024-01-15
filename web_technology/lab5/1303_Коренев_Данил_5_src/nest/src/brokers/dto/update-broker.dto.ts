import { PartialType } from '@nestjs/mapped-types';
import { CreateBrokerDto } from './create-broker.dto';
import {StockElement} from "../../stocks/entities/stock-element";

export class UpdateBrokerDto extends PartialType(CreateBrokerDto) {
  id: number
  login: string
  balance: number
  actives: Map<number, StockElement>
}
