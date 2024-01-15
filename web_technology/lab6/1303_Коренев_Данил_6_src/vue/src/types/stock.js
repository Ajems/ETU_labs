export interface Stock {
    id: number
    name: string
    prices: Map<string, number>
    quantity: number
}