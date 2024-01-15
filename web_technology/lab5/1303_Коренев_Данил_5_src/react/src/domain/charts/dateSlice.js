import {createSlice} from "@reduxjs/toolkit";

interface DateState {
    date: string
}

const initialState: DateState = {
    date: '11/27/2018'
}

export const slice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setDate: (state, action) => {
            state.date = action.payload.date
        },
        updateDate: (state, action) => {
            state.date = action.payload.date
        }
    }
})

export const { setDate, updateDate } = slice.actions
export const selectDate = (state) => state.date.date

export default slice.reducer