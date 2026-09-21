import { createSlice } from "@reduxjs/toolkit";
const initialstate = {
  cartitems: localStorage.getItem("cartitems")
    ? JSON.parse(localStorage.getItem("cartitems"))
    : [],
};
const cartslice = createSlice({
  name: "cart",
  initialState: initialstate,
  reducers: {
    addtocart: (state, action) => {
      const item = action.payload;
      const existingitem = state.cartitems.find((x) => x._id === item._id);
      if (existingitem) {
        state.cartitems = state.cartitems.map((x) =>
          x._id === item._id ? { ...x, qty: x.qty + 1 } : x,
        );
      } else {
        state.cartitems = [...state.cartitems, { ...item, qty: 1 }];
      }
      localStorage.setItem("cartitems", JSON.stringify(state.cartitems));
    },
    removefromcart: (state, action) => {
      const itemid = action.payload;
      state.cartitems = state.cartitems.filter((x) => x._id !== itemid);
      localStorage.setItem("cartitems", JSON.stringify(state.cartitems));
    },
    increaseqty: (state, action) => {
      const id = action.payload;
      const item = state.cartitems.find((x) => x._id === id);
      if (item) {
        item.qty += 1;
      }

      localStorage.setItem("cartitems", JSON.stringify(state.cartitems));
    },
    decreaseqty: (state, action) => {
      const id = action.payload;
      const item = state.cartitems.find((x) => x._id === id);
      if (item) {
        if (item.qty > 1) {
          item.qty -= 1;
        } else {
          alert("Can't decrease qty below 1");
        }
        localStorage.setItem("cartitems", JSON.stringify(state.cartitems));
      }
    },
    clearcart: (state) => {
      state.cartitems = [];
      localStorage.removeItem("cartitems");
    },
  },
});
export const {
  addtocart,
  removefromcart,
  decreaseqty,
  increaseqty,
  clearcart,
} = cartslice.actions;
export default cartslice.reducer;
