import { configureStore } from "@reduxjs/toolkit";
import cartreducer from '../redux/cartslice.js';

const store = configureStore({
    reducer: {
        cart : cartreducer,
        // user: userreducer
    }
})
export default store;