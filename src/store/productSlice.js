import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [
    {
      img: "",
      name: "",
      extraOptions: [],
      price: 0,
      quantity: 0,
      total: 0,
    },
  ],
};

const productSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getOrders: (state, action) => {
      state.product = action.payload;
    },
    getPorduct: (state, action) => {
      state.product = initialState;
    },
  },
});

export const { getOrders, getPorduct } = productSlice.actions;
export default productSlice.reducer;
