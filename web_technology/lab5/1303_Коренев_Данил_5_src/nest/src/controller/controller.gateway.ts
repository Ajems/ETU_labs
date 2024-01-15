import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
    OnGatewayInit,
} from '@nestjs/websockets';
import { ControllerService } from './controller.service';
import {Controller, Get, Post} from "@nestjs/common";
import {Server} from "socket.io";

@Controller('/controller')
@WebSocketGateway({
    namespace: '/controller',
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT']
    }
})
export class ControllerGateway
    implements OnGatewayInit{
    @WebSocketServer() server: Server;

    constructor(private controllerService: ControllerService) {
        console.log('server')
        console.log(this.server)
    }

    afterInit(server: Server): any {
        this.server = server;
        this.controllerService.onClock = this.clock
    }

    private clock = (date: Date): void => {
        this.server.emit('clockStocks', {
            date: date,
        })
    };

    @SubscribeMessage('setDate')
    setDate(@MessageBody() date: string): void {
        console.log(`Set date ${date}`)
        this.controllerService.date = new Date(date);
        this.server.emit('clockStocks', {
              date: date,
        });
    }

    @SubscribeMessage('setDelay')
    setClockDelay(@MessageBody() delay: number): void {
        this.controllerService.setClockSpeed(delay);
    }

    @SubscribeMessage('startClock')
    startClockMessage(): void {
        this.controllerService.startClock();
    }

    @SubscribeMessage('stopClock')
    stopClockMessage(): void {
        this.controllerService.stopClock();
    }

    @Get('date')
    getDate(): Date {
        return this.controllerService.date;
    }

    @SubscribeMessage('startClock')
    startClock() {
        this.controllerService.startClock();
    }

    @SubscribeMessage('stopClock')
    stopClock() {
        this.controllerService.stopClock();
    }

    @Post('set-clock-delay')
    setClockSpeed(@MessageBody('delay') delay: number) {
        this.controllerService.setClockSpeed(delay);
    }
}
