// containerSlice.js
import { createSlice } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  image: string;
}

const containerSlice = createSlice({
  name: "container",
  initialState: {
    order: 0,
    initProduct: {
      id: 8,
      title: "Tractor Porsche-Diesel Master 426",
      image: "https://micro-frontends.org/0-model-store/images/reco_1.jpg",
    },
    products: [
      {
        id: 8,
        title: "Tractor Porsche-Diesel Master 426",
        image: "https://micro-frontends.org/0-model-store/images/reco_1.jpg",
      },
      {
        id: 9,
        title: "Tractor Porsche-Diesel Master 427",
        image: "https://micro-frontends.org/0-model-store/images/reco_8.jpg",
      },
      {
        id: 10,
        title: "Tractor Porsche-Diesel Master 428",
        image: "https://micro-frontends.org/0-model-store/images/reco_7.jpg",
        related: [2, 3, 8],
      },
    ],
  },
  reducers: {
    setNewImage: (state, action) => {
      state.initProduct = action.payload;
    },
    buyProduct: (state, action) => {
      state.order += action.payload;
    },
  },
});

export const { setNewImage, buyProduct } = containerSlice.actions;
export default containerSlice.reducer;
