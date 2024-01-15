import {useAppDispatch} from "../../data/hooks";
import {getDate, getStockElements, getStocks} from "../../data/requests";
import {addCharts} from "./chartSlice";
import {addStockElement} from "./stockElementSlice";
import {setDate} from "./dateSlice";
import {Charts} from "./charts";
import {stocksSocket} from "../../data/socket";
import type {StockElement} from "./stockElement";

interface UpdateStockResponse {
    date: string;
    stockElement: StockElement | null;
}

export function ChartsContainer() {
    const dispatch = useAppDispatch()
    const stocks = getStocks()


    const stockElements = getStockElements()
    const date = getDate()

    stocks.subscribe({
        next(response) {
            dispatch(addCharts(response))
        }
    })

    stockElements.subscribe({
        next(responses) {
            for (let res of responses) {
                if (res.stockElement !== null) {
                    dispatch(addStockElement(res.stockElement))
                }
            }
        }
    })

    date.subscribe({
        next(response){
            dispatch(setDate({date: response}))
        }
    })

    stocksSocket.on('updateStock', (data: UpdateStockResponse) => {
        dispatch(setDate({date: data.stockElement}))
        if (data.stockElement != null) {
            dispatch(addStockElement(data.stockElement))
        }
    })

    return (
        <Charts/>
    )
}