import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IProducts } from "@/type/products";

// Defining the type for each product in the cart
export interface CartProduct extends IProducts {
  orderQuantity: number; // Tracks the quantity of the ordered product
}

// Defining the initial state of the cart
interface InitialState {
  products: CartProduct[]; // List of all products in the cart
  city: string; // Name of the delivery city
  shippingAddress: string; // Shipping address
}

// Setting up the default state of the cart
const initialState: InitialState = {
  products: [],
  city: "",
  shippingAddress: "",
};

// Creating the Redux Slice for the cart
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 🛒 Add a new product (if it exists, increase the quantity)
    addProduct: (state, action) => {
      const productToAdd = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (productToAdd) {
        productToAdd.orderQuantity += 1; // If the product exists, increase the quantity
        return;
      }

      state.products.push({ ...action.payload, orderQuantity: 1 }); // Add a new product to the cart
    },

    // ➕ Increase the order quantity
    incrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product) => product._id === action.payload
      );

      if (productToIncrement) {
        productToIncrement.orderQuantity += 1; // Increase quantity by 1
        return;
      }
    },

    // ➖ Decrease the order quantity (at least 1 must remain)
    decrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product) => product._id === action.payload
      );

      if (productToIncrement && productToIncrement.orderQuantity > 1) {
        productToIncrement.orderQuantity -= 1; // Decrease quantity by 1
        return;
      }
    },

    // ❌ Remove a product from the cart
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },

    // 📍 Update the delivery city
    updateCity: (state, action) => {
      state.city = action.payload;
    },

    // 📦 Update the shipping address
    updateShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },

    // 🗑️ Clear the entire cart
    clearCart: (state) => {
      state.products = [];
      state.city = "";
      state.shippingAddress = "";
    },
  },
});

//* Selectors

// Get all ordered products
export const orderedProductsSelector = (state: RootState) => {
  return state.cart.products;
};

// Get order details
export const orderSelector = (state: RootState) => {
  return {
    products: state.cart.products.map((product: CartProduct) => ({
      product: product._id,
      quantity: product.orderQuantity,
      color: "White",
    })),
    shippingAddress: `${state.cart.shippingAddress} - ${state.cart.city}`,
    paymentMethod: "Online",
  };
};

//* Payment Calculation

// Calculate subtotal price
export const subTotalSelector = (state: RootState) => {
  return state.cart.products.reduce((acc: number, product: CartProduct) => {
    if (product.offerPrice) {
      return acc + product.offerPrice * product.orderQuantity;
    } else {
      return acc + product.price * product.orderQuantity;
    }
  }, 0);
};

// Calculate shipping cost based on city
export const shippingCostSelector = (state: RootState) => {
  if (state.cart.city && state.cart.city === "Dhaka" && state.cart.products.length > 0) {
    return 60;
  } else if (state.cart.city && state.cart.city !== "Dhaka" && state.cart.products.length > 0) {
    return 120;
  } else {
    return 0;
  }
};

// Calculate grand total (subtotal + shipping cost)
export const grandTotalSelector = (state: RootState) => {
  const subTotal = subTotalSelector(state);
  const shippingCost = shippingCostSelector(state);

  return subTotal + shippingCost;
};

//* Address Selectors

// Get selected city
export const citySelector = (state: RootState) => {
  return state.cart.city;
};

// Get shipping address
export const shippingAddressSelector = (state: RootState) => {
  return state.cart.shippingAddress;
};

// Exporting all actions from the cart slice
export const {
  addProduct,
  incrementOrderQuantity,
  decrementOrderQuantity,
  removeProduct,
  updateCity,
  updateShippingAddress,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
