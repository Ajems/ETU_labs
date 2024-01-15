import {Body, Controller, Get, Param, Post,} from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import {StocksService} from './stocks.service';
import {Server} from "socket.io";
import {Observable, of} from "rxjs";
import {FindStockDto} from "./dto/find-all-info.dto";
import {FindStockElementDto} from "./dto/find-all-element";
import {CreateStockDto} from "./dto/create-stock.dto";
import {ControllerService} from "../controller/controller.service";

@Controller('/stocks')
@WebSocketGateway({
    namespace: '/stocks',
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT']
    }
})
export class StocksGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer() server: Server
    constructor(
        private readonly stocksService: StocksService,
        private readonly controllerService: ControllerService) {}

    afterInit(server: Server): any {
        this.server = server;
    }

    handleConnection(client: any, ...args: any[]): any {}

    handleDisconnect(client: any): any {}

    @Get('stockInfo')
    findStockInfo(): Observable<FindStockDto[]> {
        return this.stocksService.findStockInfo()
    }

    @Get()
    findStockElement(): Observable<FindStockElementDto[]> {
        return of(this.stocksService.findAll())
    }

    @Post()
    create(@Body() createStockDto: CreateStockDto): Observable<number> {
        return this.stocksService.create(createStockDto)
    }

    @SubscribeMessage('findAllSocket')
    findAllSocket() {
        console.log('find all socket')
        this.stocksService.findAll().forEach((stockElement) => {
            this.server.emit('updateStock', stockElement);
            this.server.emit('updateStockElement', {...stockElement});
        });
    }

    @SubscribeMessage('findAllStocksByDate')
    findAllStocksByDate(@Body() dateObject: { date: string }) {
        this.stocksService.date = new Date(dateObject.date);
        this.stocksService.findAll().forEach((stockElement) => {
            console.log(stockElement.stockElement.price)
            this.server.emit('updateStock', stockElement);
            this.server.emit('updateStockElement', { ...stockElement });
        });
    }

    @Get(':id')
    findOne(@Param('id') id: number): Observable<FindStockElementDto> {
        return this.stocksService.findOne(id);
    }
}
