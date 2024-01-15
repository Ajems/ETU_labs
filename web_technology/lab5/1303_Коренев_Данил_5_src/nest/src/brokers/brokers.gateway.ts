import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {BrokersService} from './brokers.service';
import {CreateBrokerDto} from './dto/create-broker.dto';
import {UpdateBrokerDto} from './dto/update-broker.dto';
import {Server} from 'socket.io';
import {UpdateBrokerBalanceDto} from "./dto/update-broker-balance.dto";
import {Body} from "@nestjs/common";
import {StockElement} from "../stocks/entities/stock-element";

@WebSocketGateway({
    namespace: '/brokers',
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT']
    }
})
export class BrokersGateway {
    constructor(private readonly brokersService: BrokersService) {}
    @WebSocketServer() server: Server

    private send(event: string, src: any) {
        this.server.emit(event, src)
        return src
    }

    @SubscribeMessage('create')
    create(@MessageBody() createBrokerDto: CreateBrokerDto) {
        return this.send('update', this.brokersService.create(createBrokerDto));
    }

    @SubscribeMessage('findAll')
    findAll() {
        return this.brokersService.findAll().map((broker) => broker.toJson())
    }

    @SubscribeMessage('findOne')
    findOne(@MessageBody() id: number) {
        const broker =  this.brokersService.findOne(id);
        return this.send('findOne', broker ? broker.toJson() : {})
    }

    @SubscribeMessage('findOneByLogin')
    findOneByLogin(@MessageBody() login: string) {
        const broker =  this.brokersService.findByLogin(login);
        return this.send('findOne', broker ? broker.toJson() : {})
    }

    @SubscribeMessage('update')
    update(@MessageBody() updateBrokerBalanceDto: UpdateBrokerBalanceDto) {
        const broker = this.brokersService.updateBalance(updateBrokerBalanceDto);
        console.log("send update broker")
        console.log(broker)
        return this.send('update', broker);
    }

    @SubscribeMessage('remove')
    remove(@MessageBody() id: number) {
        console.log(`remove ${id}`)
        const result = this.brokersService.remove(id)
        return this.send('remove', result)
    }

    @SubscribeMessage('order')
    order(@Body() order: {stockId: number, stockName: string, stockPrice: number, quantity: number, brokerId: number}) {
        const broker = this.brokersService.order(order.stockId, order.stockName, order.stockPrice, order.quantity, order.brokerId);
        const activesObject: Record<string, StockElement> = {};
        broker.actives.forEach((stockElement, key) => {
            activesObject[key.toString()] = stockElement;
        });
        const updatedBroker: any = {
            ...broker,
            actives: activesObject,
        };
        return this.send('update', updatedBroker)
    }
}
