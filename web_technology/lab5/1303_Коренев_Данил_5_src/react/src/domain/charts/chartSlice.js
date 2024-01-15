import {createSlice} from "@reduxjs/toolkit";

interface ChartState {
    id: number;
    name: string;
    prices: {date: string, price: number}[];
    quantity: number;
}

interface ChartsState {
    value: { [id: number]: ChartState};
    selectedChartId?: number;
}

const initialState: ChartsState = {
    value: {},
    selectedChartId: 0
}

export const slice = createSlice({
    name: 'charts',
    initialState,
    reducers: {
        addChart: (state, action) => {
            state.value[action.payload.id] = action.payload;
        },
        addCharts: (state, action) => {
            action.payload.forEach(chart => {
                state.value[chart.id] = chart;
            });
        },
        removeChart: (state, action) => {
            delete state.value[action.payload];
        },
        updateChart: (state, action) => {
            state.value[action.payload.id] = action.payload;
        },
        selectChartId: (state, action) => {
            state.selectedChartId = action.payload;
        }
    }
})

export const {
    addChart,
    addCharts,
    removeChart,
    updateChart,
    selectChartId
} = slice.actions

export const selectChart = (state, id) => {
    return state.charts.value[id] ?? null;
}
export const selectChartIds = (state) => {
    return Object.keys(state.charts.value).map(id => Number(id))
}
export const selectSelectedChartId = (state) => state.charts.selectedChartId;


export default slice.reducer