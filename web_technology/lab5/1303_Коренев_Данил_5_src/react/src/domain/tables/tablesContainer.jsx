import {useAppDispatch} from "../../data/hooks";
import {getStocks} from "../../data/requests";
import {addCharts} from "../charts/chartSlice";
import {Tables} from "./tables";
import './tables.css'

export function TablesContainer() {
    const dispatch = useAppDispatch();
    const stockDetails = getStocks();


    stockDetails.subscribe({
        next(response) {
            dispatch(addCharts(response));
        }
    });

    return (
        <Tables />
    )
}