import { Injectable } from '@nestjs/common';

@Injectable()
export class ControllerService {
    public onClock?: (date: Date) => void;
    public onUpdateStock?: (date: Date) => void

    private clockTimeout?: NodeJS.Timeout;
    private currentDate: Date;
    private delay = 1000;

    constructor() {
       this.currentDate = new Date()
    }

    public set date(date: Date) {
        this.currentDate = this.formatDate(date)
    }

    public get date(): Date {
        return this.currentDate;
    }

    formatDate(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    startClock(): void {
        console.log(`start clock`)
        if (this.clockTimeout != null) {
            return;
        }
        if (this.currentDate == null) {
            return;
        }

        this.clockTimeout = setInterval(() => {
            this.clock();
        }, this.delay);
    }

    setClockSpeed(delay: number): void {
        console.log(`set clock speed ${delay}`)
        this.delay = delay;
        if (this.clockTimeout != null) {
            this.stopClock();
            this.startClock();
        }
    }

    stopClock(): void {
        console.log(`stop clock`)
        if (this.clockTimeout == null) {
            return;
        }

        clearInterval(this.clockTimeout);
        this.clockTimeout = undefined;
    }

    private clock() {
        if (this.currentDate >= new Date('11/24/2023')){
            this.stopClock()
            return
        }
        this.currentDate = new Date(
            this.currentDate.getTime() + 24 * 60 * 60 * 1000,
        );
        if (this.onClock) {
            this.onClock(this.currentDate);
        }
        console.log(this.onUpdateStock)
        if (this.onUpdateStock){
            console.log("on update stock")
            this.onUpdateStock(this.currentDate)
        }
    }
}
