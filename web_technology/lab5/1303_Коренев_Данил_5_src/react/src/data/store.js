import { configureStore } from '@reduxjs/toolkit';
import brokerReducer from '../domain/brokers/brokerSlice'
import chartsReducer from '../domain/charts/chartSlice'
import stockElementsReducer from '../domain/charts/stockElementSlice'
import dateReducer from '../domain/charts/dateSlice'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: {
        brokers: brokerReducer,
        charts: chartsReducer,
        stockElements: stockElementsReducer,
        date: dateReducer
    }
});

export default store;