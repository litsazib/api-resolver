import { createSlice } from '@reduxjs/toolkit';
import data from '../../api_data'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items:data,
    totalAmount: 0,
    totalCount: 0,
  },
  reducers: {
    // Adding item to cart
    addToCart: (state, action) => {
      const isItemAlreadyAdded = state.items.filter(
        (item) => item.title === action.payload.title,
      );
      if (isItemAlreadyAdded.length === 0) {
        state.items = [...state.items, action.payload];
      }
    },

    // Getting total amount from the cart
    getCartTotal: (state) => {
      const { totalAmount, totalCount } = state.items.reduce(
        (cartTotal, cartItem) => {
          const { price } = cartItem;
          const itemTotal = price;
          cartTotal.totalAmount += itemTotal;
          cartTotal.totalCount += 1;
          return cartTotal;
        },
        { totalAmount: 0, totalCount: 0 },
      );
      state.totalAmount = parseInt(totalAmount.toFixed(2), 10);
      state.totalCount = totalCount;
    },
    // removing item from shopping cart
    remove: (state, action) => {
      state.items = state.items.filter((item) => item.title !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalCount = 0;
    },
  },
});

export const { addToCart, getCartTotal, remove, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
