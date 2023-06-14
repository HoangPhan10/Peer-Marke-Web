import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  userInfo: {};
  address:{};
  name_shop:String;
  product_payment : []
}

const initialState: UserState = {
  userInfo: {},
  address:{},
  name_shop:null,
  product_payment: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    addNameShop: (state, action) => {
      state.name_shop = action.payload;
    },
    addAddress: (state, action) => {
      state.address = action.payload;
    },
    addProductPayment: (state, action) => {
      state.product_payment = action.payload;
    },
  },
});

export const { addUser,addAddress,addNameShop,addProductPayment } = userSlice.actions;
export const getUser = (state) => state.user.userInfo;
export const getAddress = (state) => state.user.address;
export const getNameShop = (state) => state.user.name_shop;
export const getProductPayment = (state) => state.user.product_payment;
const userReducer = userSlice.reducer;
export default userReducer;
