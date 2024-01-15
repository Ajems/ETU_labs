import {StockElement} from "../entities/stock-element";

export class FindStockElementDto {
    constructor(
        public readonly date: string,
        public readonly stockElement: StockElement,
    ) {}
}
