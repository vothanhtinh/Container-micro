import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../configStore";

const selectSlice = (state: RootState) => state.container;

export const selectContainers = createSelector(
  [selectSlice],
  (state) => state.products
);

export const selectInitProduct = createSelector(
  [selectSlice],
  (state) => state.initProduct
);

export const selectOrder = createSelector(
  [selectSlice],
  (state) => state.order
);
