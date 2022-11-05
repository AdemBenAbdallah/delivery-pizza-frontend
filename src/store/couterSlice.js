import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    counter : 0
}

const counterSlice = createSlice({
    name : "counter",
    initialState,
    reducers : {
        increment : (state) => {
            state.counter += 1
        },
        descriment : (state) => {
            state.counter -= 1
        }
    }
})

export const {increment , descriment} = counterSlice.actions
export default counterSlice.reducer