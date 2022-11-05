import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import couterSlice from "./couterSlice";
import adminSlice from "./adminSlice"

export const store = configureStore({
    reducer : {
        order : productSlice,
        counter : couterSlice,
        admin : adminSlice
    }
})