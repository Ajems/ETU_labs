import {StockElement} from "./stock-element";

export class Stock {
    constructor(
        public id: number,
        public name: string,
        public prices: Map<string, number>,
        public quantity: number
    ) {  }

    getStockElement(date: Date): StockElement {
        const formatDate = this.formatDate(date)
        const stockElement = new StockElement(
            this.id,
            this.name,
            this.prices.has(formatDate) ? this.prices.get(formatDate) : null,
            this.quantity
        )
        return stockElement
    }

    formatDate(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString()

        return `${month}/${day}/${year}`;
    }
}
