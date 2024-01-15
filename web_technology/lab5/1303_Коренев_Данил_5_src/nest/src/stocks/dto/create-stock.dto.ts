export class CreateStockDto {
    public name: string;
    public prices: Map<string, number>;
    public quantity?: number;
}
