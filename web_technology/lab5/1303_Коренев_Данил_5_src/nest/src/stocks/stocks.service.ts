import {Injectable, OnModuleInit} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import {Observable, of} from "rxjs";
import {FindStockDto} from "./dto/find-all-info.dto";
import {Stock} from "./entities/stock.entity";
import * as path from "path";
import * as fs from "fs";
import * as csv from 'csv-parser';
import {FindStockElementDto} from "./dto/find-all-element";

@Injectable()
export class StocksService implements OnModuleInit {
    private stocks: Map<number, Stock> = new Map();
    date?: Date;


    onModuleInit(): void {
        this.loadStocks();
    }

    loadStocks() {
        const dirname = path.resolve().replace('src/stocks', '')
        const fileName = path.join(dirname, 'data/stocks/stocks.json');
        if (!fs.existsSync(fileName)) {
            return;
        }
        const data = fs.readFileSync(fileName, 'utf8')
        const stocks = JSON.parse(data)
        for (const stock of stocks) {
            const csvFilePath = path.join(dirname, 'data/stocks', stock.prices);
            const parsedPrices = this.parseCsvFile(csvFilePath);
            this.stocks.set(
                stock.id,
                new Stock(stock.id, stock.name, parsedPrices, stock.quantity),
            );
        }
    }

    private parseCsvFile(filePath: string): Map<string, number> {
        const pricesMap = new Map<string, number>();

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row: { Date?: string; Open?: string }) => {
                if (row.Date && row.Open) {
                    pricesMap.set(row.Date, parseFloat(row.Open.replace('$', '')));
                }
            })
            .on('end', () => {
                console.log(`CSV file ${filePath} successfully processed.`);
            });
        return pricesMap;
    }

    findStockInfo(): Observable<FindStockDto[]> {
        return of(
            Array.from(this.stocks.values()).map((stock) => {
                const table =  {
                    id: stock.id,
                    name: stock.name,
                    prices: Array.from(stock.prices.entries()).map(([date, price]) => {
                        return { date: date, price: price };
                    }),
                    quantity: stock.quantity,
                };
                return table
            }),
        );
    }

    findAll(): FindStockElementDto[] {
        return Array.from(this.stocks.values()).map((stock) => {
            return { date: this.formatDate(this.date), stockElement: stock.getStockElement(this.date)}
        })
    }

    formatDate(date: Date): string {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            throw new Error('Invalid Date object');
        }

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString()

        return `${month}/${day}/${year}`;
    }

    findOne(id: number): Observable<FindStockElementDto> {
        const stock = this.stocks.get(id);
        if (stock) {
            return of({
                date: this.formatDate(this.date),
                stockElement: stock.getStockElement(this.date),
            });
        } else {
            return of({
                date: new Date().toISOString().split('T')[0],
                stockElement: null,
            });
        }
    }

    create(createStockDto: CreateStockDto): Observable<number> {
        const id = this.stocks.size + 1;
        const stock = new Stock(
            id,
            createStockDto.name,
            createStockDto.prices,
            createStockDto.quantity || 0,
        );
        this.stocks.set(id, stock);
        return of(id);
    }
}
