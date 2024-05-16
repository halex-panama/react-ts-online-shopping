import { createSlice } from "@reduxjs/toolkit";
import { Products } from "./productsSlice";

export type Carts = Products & {
  quantity: number;
  totalPrices: number;
  discountedPrice: number;
};

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

    removeFromCart: (state, action) => {
      const tempCart = state.carts.filter((item) => item.id !== action.payload);
      state.carts = tempCart;
      storeInLocalStorage(state.carts);
    },

    clearCart: (state) => {
      state.carts = [] as Carts[];
      storeInLocalStorage(state.carts);
    },

    getCartTotal: (state) => {
      state.totalAmount = state.carts.reduce((cartTotal, cartItem) => {
        return (cartTotal += cartItem.totalPrices);
      }, 0);

      state.itemsCount = state.carts.length;
    },

    toggleCartQty: (state, action) => {
      const tempCart = state.carts.map((item) => {
        if (item.id === action.payload.id) {
          let tempQty = item.quantity;
          let tempTotalPrice = item.totalPrices;

          if (action.payload.type === "INC") {
            tempQty++;
            if (tempQty === item.stock) tempQty = item.stock;
            tempTotalPrice = tempQty * item.discountedPrice;
          }

          if (action.payload.type === "DEC") {
            tempQty--;
            if (tempQty < 1) tempQty = 1;
            tempTotalPrice = tempQty * item.discountedPrice;
          }

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
export const {
  addToCart,
  removeFromCart,
  clearCart,
  getCartTotal,
  toggleCartQty,
  setCartMessageOff,
  setCartMessageOn,
} = cartSlice.actions;
