import { createSlice } from "@reduxjs/toolkit";
import { Products } from "./productsSlice";

export type Carts = Products & { quantity: number; totalPrices: number };

export type initialStateType = {
  carts: Carts[];
  itemsCount: number;
  totalAmount: number;
  isCartMessageOn: boolean;
};

const fetchLocalStorage = () => {
  let cart = localStorage.getItem("cart");

  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
};

const storeInLocalStorage = (data: Carts[]) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

const initialState: initialStateType = {
  carts: fetchLocalStorage(),
  itemsCount: 0,
  totalAmount: 0,
  isCartMessageOn: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isItemInCart = state.carts.find(
        (item) => item.id === action.payload.id
      );

      if (isItemInCart) {
        const tempCart = state.carts.map((item) => {
          if (item.id === action.payload.id) {
            let tempQty = item.quantity + action.payload.quantity;

            let tempTotalPrice = tempQty * item.price;

            return {
              ...item,
              quantity: tempQty,
              totalPrices: tempTotalPrice,
            };
          } else {
            return item;
          }
        });
        state.carts = tempCart;
        storeInLocalStorage(state.carts);
      } else {
        state.carts.push(action.payload);
        storeInLocalStorage(state.carts);
      }
    },
    setCartMessageOn: (state) => {
      state.isCartMessageOn = true;
    },
    setCartMessageOff: (state) => {
      state.isCartMessageOn = false;
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, setCartMessageOff, setCartMessageOn } =
  cartSlice.actions;
