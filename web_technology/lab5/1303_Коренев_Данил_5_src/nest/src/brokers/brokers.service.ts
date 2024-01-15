import {Injectable, OnModuleInit} from '@nestjs/common';
import {CreateBrokerDto} from './dto/create-broker.dto';
import {UpdateBrokerDto} from './dto/update-broker.dto';
import {Broker} from "./entities/broker.entity";
import * as path from "path";
import * as fs from "fs";
import {StockElement} from "../stocks/entities/stock-element";
import {UpdateBrokerBalanceDto} from "./dto/update-broker-balance.dto";

@Injectable()
export class BrokersService implements OnModuleInit{

    private brokers: Map<number, Broker> = new Map();

    onModuleInit(): any {
        this.loadBrokers()
    }

    loadBrokers() {
        const dirname = path.resolve().replace('src/brokers', '');
        const fileName = path.join(dirname, 'data/brokers/brokers.json');
        if (!fs.existsSync(fileName)) {
            return;
        }
        const data = fs.readFileSync(fileName, 'utf8');
        const brokersData = JSON.parse(data);

        for (const brokerData of brokersData) {
            const activesMap = new Map<number, StockElement>();
            for (const stockId in brokerData.actives) {
                if (brokerData.actives.hasOwnProperty(stockId)) {
                    const stockData = brokerData.actives[stockId];
                    const stockElement = new StockElement(
                        stockData.id,
                        stockData.name,
                        stockData.price,
                        stockData.quantity
                    );
                    activesMap.set(parseInt(stockId), stockElement);
                }
            }
            const broker = new Broker(
                brokerData.id,
                brokerData.login,
                brokerData.balance,
                activesMap
            );
            this.brokers.set(broker.id, broker);
        }

        console.log(`load brokers ${JSON.stringify(Array.from(this.brokers.entries()))}`);
    }
    create(createBrokerDto: CreateBrokerDto) {
        const id = this.brokers.size
        const newBroker = new Broker(
            id,
            createBrokerDto.login,
            createBrokerDto.balance ?? 0,
            new Map()
        )
        this.brokers.set(id, newBroker)
        this.addBroker(newBroker)
        return newBroker
    }

    findAll() {
        console.log(this.brokers.values())
        return [...this.brokers.values()]
    }

    findOne(id: number): Broker {
        return this.brokers.get(id)
    }

    findByLogin(login: string): Broker {
        return [...this.brokers.values()].find((broker) => {
            return broker.login === login;
        });
    }

    order(stockId: number, stockName: string, stockPrice: number, quantity: number, brokerId: number): Broker {
        let broker = this.findOne(brokerId)
        if (quantity > 0) {
            if (broker.balance >= quantity*stockPrice) {
                broker = this.processOrder(stockId, stockName, stockPrice, quantity, broker)
            }
        } else if (quantity < 0) {
            if (broker.actives.has(stockId)){
                if (broker.actives.get(stockId).quantity >= quantity) {
                    broker = this.processOrder(stockId, stockName, stockPrice, quantity, broker)
                }
            }
        }
        this.brokers.set(brokerId, broker)
        return broker
    }

    processOrder(stockId: number, stockName: string, stockPrice: number, quantity: number, broker: Broker): Broker {
        if (stockPrice === null)  return broker
        let active = broker.actives.get(stockId)
        if (quantity > 0) {
            if (active) {
                console.log("recalculate price")
                console.log(active)
                active.price = (active.price * active.quantity + stockPrice * quantity) / (active.quantity + quantity)
                active.quantity+=quantity
                console.log(active)
            } else {
                broker.actives.set(stockId, new StockElement(stockId, stockName, stockPrice, quantity))
                active = broker.actives.get(stockId)
            }
        } else {
            active.quantity+=quantity
        }
        broker.actives.set(stockId, active)
        broker.balance-=stockPrice*quantity
        this.changeBroker(broker)
        return broker
    }

    update(updateBrokerDto: UpdateBrokerDto) {
        const broker = updateBrokerDto.id
            ? this.findOne(updateBrokerDto.id)
            : this.findByLogin(updateBrokerDto.login);
        if (!broker) {
            return this.create(updateBrokerDto);
        } else {
            Object.assign(broker, updateBrokerDto);
            this.changeBroker(broker)
            return broker;
        }
    }

    updateBalance(updateBrokerBalanceDto: UpdateBrokerBalanceDto) {
        console.log('update broker')
        const broker = updateBrokerBalanceDto.id
            ? this.findOne(updateBrokerBalanceDto.id)
            : this.findByLogin(updateBrokerBalanceDto.login);

        if (!broker) {
            return this.create(updateBrokerBalanceDto);
        } else {
            console.log(broker)
            console.log(updateBrokerBalanceDto)
            Object.assign(broker, updateBrokerBalanceDto)
            console.log(broker)
            this.changeBroker(broker);
            return broker;
        }
    }

    remove(id: number) {
        this.brokers.delete(id)
        this.deleteBroker(id)
        return id
    }

    readBrokersFile() {
        const dirname = path.resolve().replace('src/brokers', '')
        const fileName = path.join(dirname, 'data/brokers/brokers.json');
        if (!fs.existsSync(fileName)) {
            return;
        }
        const data = fs.readFileSync(fileName, 'utf-8');
        return JSON.parse(data);
    }

    writeBrokersFile(data: any) {
        const jsonData = JSON.stringify(data, null, 2);
        const dirname = path.resolve().replace('src/brokers', '')
        const fileName = path.join(dirname, 'data/brokers/brokers.json');
        if (!fs.existsSync(fileName)) {
            return;
        }
        fs.writeFileSync(fileName, jsonData, 'utf-8');
    }

    addBroker(broker: Broker) {
        const brokers = this.readBrokersFile();
        broker.id = brokers.length;
        brokers.push(broker);
        this.writeBrokersFile(brokers);
    }

    changeBroker(updatedBroker: Broker) {
        console.log('change broker');
        console.log(updatedBroker);

        const brokers = this.readBrokersFile();
        const index = brokers.findIndex(broker => broker.id === updatedBroker.id);

        console.log(brokers[index]);

        if (index !== -1) {
            if (updatedBroker.actives instanceof Map) {
                const activesObject = {};
                updatedBroker.actives.forEach((value, key) => {
                    activesObject[key] = { ...value };
                });
                brokers[index] = {...updatedBroker, actives: activesObject};
                console.log(brokers);
                this.writeBrokersFile(brokers);
            }
        }
    }


    deleteBroker(brokerId: number) {
        const brokers = this.readBrokersFile();
        const index = brokers.findIndex(broker => broker.id === brokerId);

        if (index !== -1) {
            brokers.splice(index, 1);
            this.writeBrokersFile(brokers);
        }
    }
}
