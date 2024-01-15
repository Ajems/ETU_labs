import {createSlice} from "@reduxjs/toolkit";

export interface StockElementState {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface StockElementsState {
    value: { [id: number]: StockElementState}
}

const initialState: StockElementsState = {
    value: {}
}

export const slice = createSlice({
    name: 'stockElements',
    initialState,
    reducers: {
        addStockElement: (state, action) => {
            state.value[action.payload.id] = action.payload
        },
        deleteStockElement: (state, action) => {
            delete state.value[action.payload]
        },
        updateStockElement: (state, action) => {
            state.value[action.payload.id] = action.payload
        }
    }
})

export const {
    addStockElement,
    deleteStockElement,
    updateStockElement
} = slice.actions

export const getStockElement = (state, id) => state.stockElements.value[id] ?? null

export default slice.reducer
