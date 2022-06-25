import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContextMenuItem } from "../../../app/modules/shared/components/layout_components/context_menu";

const stock = createSlice({
  name: "context_menu",
  initialState: {
    isOpen: false,
    xPos: 0,
    yPos: 0,
    items: Array<ContextMenuItem>(),
  },
  reducers: {
    showMenu(
      state,
      action: PayloadAction<{
        xPos: number;
        yPos: number;
        items: ContextMenuItem[];
      }>
    ) {
      state.isOpen = true;
      state.xPos = action.payload.xPos;
      state.yPos = action.payload.yPos;
      state.items = action.payload.items;
    },
    hideMenu(state) {
      state.isOpen = false;
      state.xPos = 0;
      state.yPos = 0;
      state.items = [];
    },
  },
});

export const { showMenu, hideMenu } = stock.actions;
export default stock.reducer;
