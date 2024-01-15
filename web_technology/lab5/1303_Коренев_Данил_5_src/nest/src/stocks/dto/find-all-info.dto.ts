export class FindStockDto {
    public readonly id: number;
    public readonly name: string;
    public readonly prices: { date: string; price: number }[];
    public readonly quantity: number;
}
