import {StockElement} from "../../stocks/entities/stock-element";

export class Broker {
    constructor(
        public id: number,
        public login: string,
        public balance: number,
        public actives: Map<number, StockElement>
    ) {  }

    buy(stockId: number, name: string, quantity: number, price: number) {
        if (this.balance < price * quantity){
            return false
        }
        if (!this.actives.has(stockId)) {
            this.actives.set(stockId, new StockElement(stockId, name, price, quantity));
        }

        const ownedStocks = this.actives.get(stockId);
        const newPrice = (ownedStocks.price*ownedStocks.quantity + price*quantity)/(ownedStocks.quantity+quantity)

        this.actives.set(
            stockId,
            new StockElement(
                stockId,
                name,
                newPrice,
                ownedStocks.quantity+quantity
            )
        );
        this.balance -= price * quantity;
        return true
    }

    sell(stockId: number, quantity: number, price: number) {
        if(!this.actives.has(stockId)) return false
        if(this.actives.get(stockId).quantity < quantity) return false
        this.actives.get(stockId).quantity -= quantity
        this.balance += price * quantity;
    }

    toJson(): any {
        const activesObject: { [key: number]: StockElement } = {};

        this.actives.forEach((stockElement, key) => {
            activesObject[key] = {
                id: stockElement.id,
                name: stockElement.name,
                price: stockElement.price,
                quantity: stockElement.quantity,
            };
        });

        const returnBroker = {
            id: this.id,
            login: this.login,
            balance: this.balance,
            actives: activesObject,
        };

        console.log(returnBroker)
        return returnBroker
    }
}
