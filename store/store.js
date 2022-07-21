import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
const instate = {
  isLoggedIn: false,
  allProducts: [],
  categories: [],
  allBrands: [],
  userDetails: {},
  cartItems: [],
  totalAmountDetails: {
    totalAmount: 0,
    totalDiscount: 0,
  },
  currentSearchItems: [],
  currentSearchItemsList: [],
  wishListItems: [],
  saveToLaterItems: [],
  totalCheckoutDetails: {
    totalAmount: 0,
    totalDiscount: 0,
  },
  checkoutItems: [],
  recentlyVisitedItems: [],
};
const globalReducer = createSlice({
  name: "globalReducer",
  initialState: instate,
  reducers: {
    setCartItems: (state, action) => {
      function calculateDiscount(curPrice, discount) {
        const tp = (curPrice / (100 - discount)) * 100;
        const discountedValue = tp - curPrice;
        return Math.round(discountedValue);
      }
      state.cartItems = [
        ...state.cartItems,
        { quantity: 1, ...action.payload },
      ];
      state.totalAmountDetails.totalAmount += action.payload.price;
      state.totalAmountDetails.totalDiscount += calculateDiscount(
        action.payload.price,
        action.payload.discountPercentage
      );
    },
    removeCartItem: (state, action) => {
      function calculateDiscount(curPrice, discount) {
        const tp = (curPrice / (100 - discount)) * 100;
        const discountedValue = tp - curPrice;
        return Math.round(discountedValue);
      }
      const itemToRemove = state.cartItems.filter(
        (item) => item.id == action.payload.id
      );
      state.totalAmountDetails.totalAmount -= itemToRemove[0].price;
      state.totalAmountDetails.totalDiscount -= calculateDiscount(
        itemToRemove[0].price,
        action.payload.discountPercentage
      );
      state.cartItems = state.cartItems.filter(
        (item) => item.id != action.payload.id
      );
    },
    incrementCartItem: (state, action) => {
      function calculateDiscount(curPrice, discount) {
        const tp = (curPrice / (100 - discount)) * 100;
        const discountedValue = tp - curPrice;
        return Math.round(discountedValue);
      }
      state.cartItems = state.cartItems.map((item) => {
        if (item.id == action.payload.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
            price: item.price + item.price / item.quantity,
          };
        } else return item;
      });

      state.totalAmountDetails.totalAmount += Math.round(
        action.payload.price / action.payload.quantity
      );
      state.totalAmountDetails.totalDiscount += calculateDiscount(
        action.payload.price / action.payload.quantity,
        action.payload.discountPercentage
      );
    },
    decrementCartItem: (state, action) => {
      function calculateDiscount(curPrice, discount) {
        const tp = (curPrice / (100 - discount)) * 100;
        const discountedValue = tp - curPrice;
        return Math.round(discountedValue);
      }
      state.cartItems = state.cartItems.map((item) => {
        if (item.id == action.payload.id) {
          return {
            ...item,
            quantity: item.quantity - 1,
            price: item.price - item.price / item.quantity,
          };
        } else return item;
      });
      state.totalAmountDetails.totalAmount -= Math.round(
        action.payload.price / action.payload.quantity
      );
      state.totalAmountDetails.totalDiscount -= calculateDiscount(
        action.payload.price / action.payload.quantity,
        action.payload.discountPercentage
      );
    },

    setLoginState: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setLoggedInUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setAllProductsData: (state, action) => {
      state.allProducts = action.payload; //set all products
      const cat = [];
      for (let i = 0; i < action.payload.length; i++) {
        const temp = cat.findIndex(
          (item) => item.category == action.payload[i].category
        );
        if (temp < 0) {
          cat.push({
            id: i,
            category: action.payload[i].category,
            thumbnail: action.payload[i].thumbnail,
          });
        }
      }
      const brands = [];
      for (let i = 0; i < action.payload.length; i++) {
        const temp = brands.findIndex(
          (item) => item.brand == action.payload[i].brand
        );
        if (temp < 0) {
          brands.push({
            id: i,
            brand: action.payload[i].brand,
          });
        }
      }
      state.allBrands = [...brands];
      state.categories = [...cat]; //set all categories
    },
    setAllCurrentSearchItems: (state, action) => {
      const searchText = action.payload;
      state.currentSearchItems = state.allProducts.filter((product) => {
        const isBrand = product.brand
          .toLowerCase()
          .includes(searchText.toLowerCase());
        const isTitle = product.title
          .toLowerCase()
          .includes(searchText.toLowerCase());
        const isCategory = product.category
          .toLowerCase()
          .includes(searchText.toLowerCase());
        return isBrand || isTitle || isCategory;
      });
    },
    setCurrentSearchItemsList: (state, action) => {
      const searchText = action.payload;
      const titles = [];
      const brands = [];
      const categories = [];
      //gets matching title
      state.allProducts.forEach((product) => {
        const isTitle =
          searchText != "" &&
          product.title.toLowerCase().includes(searchText.toLowerCase());
        if (isTitle) {
          titles.push(product.title);
        }
      });
      //gets matching categories
      state.categories.forEach((product) => {
        const isCategory =
          searchText != "" &&
          product.category.toLowerCase().includes(searchText.toLowerCase());
        if (isCategory) {
          categories.push(product.category);
        }
      });
      //gets matching brands
      state.allBrands.forEach((product) => {
        const isBrand =
          searchText != "" &&
          product.brand.toLowerCase().includes(searchText.toLowerCase());

        if (isBrand) {
          brands.push(product.brand);
        }
      });

      state.currentSearchItemsList = [...titles, ...brands, ...categories];

      if (state.currentSearchItemsList.length == 0 && searchText != "") {
        state.currentSearchItemsList.push(searchText);
      }
    },
    setBrandProductList: (state, action) => {
      state.currentSearchItems = state.allProducts.filter((product) => {
        return product.brand == action.payload;
      });
    },
    setCategoryProductList: (state, action) => {
      state.currentSearchItems = state.allProducts.filter((product) => {
        return product.category == action.payload;
      });
    },
    setInitialCartItems: (state, action) => {
      const initalCartItems = action.payload;
      function calculateDiscount(curPrice, discount) {
        const tp = (curPrice / (100 - discount)) * 100;
        const discountedValue = tp - curPrice;

        return Math.round(discountedValue);
      }
      initalCartItems.forEach((item) => {
        const product = state.allProducts.filter((prod) => {
          return prod.id == item.productId;
        })[0];
        state.totalAmountDetails.totalAmount += item.quantity * product?.price;
        state.totalAmountDetails.totalDiscount +=
          calculateDiscount(product?.price, product?.discountPercentage) *
          item.quantity;
        state.cartItems.push({
          ...product,
          quantity: item.quantity,
          price: product?.price * item.quantity,
        });
      });
    },
    setWishListItem: (state, action) => {
      const wishitem = state.allProducts.filter((item) => {
        return item.id == action.payload.id;
      })[0];
      state.wishListItems = [...state.wishListItems, wishitem];
    },
    removeWishListItem: (state, action) => {
      state.wishListItems = state.wishListItems.filter((item) => {
        return item.id != action.payload.id;
      });
    },
    setSaveToLaterItems: (state, action) => {
      const saveLaterItem = state.cartItems.filter((item) => {
        return item.id == action.payload.id;
      })[0];
      state.saveToLaterItems = [...state.saveToLaterItems, saveLaterItem];
    },
    removeSaveToLaterItems: (state, action) => {
      state.saveToLaterItems = state.saveToLaterItems.filter((item) => {
        return item.id != action.payload.id;
      });
    },
    setInitialSavedItems: (state, action) => {
      const initalSavedCartItems = action.payload;
      initalSavedCartItems.forEach((item) => {
        const product = state.allProducts.filter((prod) => {
          return prod.id == item.productId;
        })[0];
        state.totalAmountDetails.totalAmount += item.quantity * product?.price;
        state.saveToLaterItems.push({
          ...product,
          quantity: item.quantity,
          price: product?.price * item.quantity,
        });
      });
    },
    setInitialWishListItems: (state, action) => {
      const initalWishListItems = action.payload;
      initalWishListItems.forEach((item) => {
        const product = state.allProducts.filter((prod) => {
          return prod.id == item.productId;
        })[0];

        state.wishListItems.push(product);
      });
    },
    setCheckoutItems: (state, action) => {
      state.checkoutItems = [...action.payload];
      state.totalCheckoutDetails.totalAmount =
        state.totalAmountDetails.totalAmount;
      state.totalCheckoutDetails.totalDiscount =
        state.totalAmountDetails.totalDiscount;
      console.log("InitialDisc", state.totalAmountDetails.totalDiscount);
    },
    incrementCheckoutItem: (state, action) => {
      function calculateDiscount(curPrice, discount) {
        const tp = (curPrice / (100 - discount)) * 100;
        const discountedValue = tp - curPrice;
        return Math.round(discountedValue);
      }
      state.checkoutItems = state.checkoutItems.map((item) => {
        if (item.id == action.payload.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
            price: item.price + item.price / item.quantity,
          };
        } else return item;
      });

      state.totalCheckoutDetails.totalAmount += Math.round(
        action.payload.price / action.payload.quantity
      );
      console.log("tp", state.totalCheckoutDetails.totalAmount);
      state.totalCheckoutDetails.totalDiscount += calculateDiscount(
        action.payload.price / action.payload.quantity,
        action.payload.discountPercentage
      );
    },
    decrementCheckoutItem: (state, action) => {
      function calculateDiscount(curPrice, discount) {
        const tp = (curPrice / (100 - discount)) * 100;

        const discountedValue = tp - curPrice;
        return Math.round(discountedValue);
      }
      state.checkoutItems = state.checkoutItems.map((item) => {
        if (item.id == action.payload.id) {
          return {
            ...item,
            quantity: item.quantity - 1,
            price: item.price - item.price / item.quantity,
          };
        } else return item;
      });
      state.totalCheckoutDetails.totalAmount -= Math.round(
        action.payload.price / action.payload.quantity
      );
      state.totalCheckoutDetails.totalDiscount -= calculateDiscount(
        action.payload.price / action.payload.quantity,
        action.payload.discountPercentage
      );
    },
    clearState: (state, action) => {
      for (let prop in state) {
        console.log(instate[prop]);
        state[prop] = instate[prop];
      }
      console.log(instate);
      console.log(state);
      // state.cartItems = [];
      // state.allBrands = [];
      // state.saveToLaterItems = [];
      // state.checkoutItems = [];
    },

    setRecentlyVisitedProducts: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.recentlyVisitedItems = [...action.payload];
        return;
      }
      const id = action.payload;
      const isInList = state.recentlyVisitedItems.indexOf(id);

      if (isInList >= 0) {
        state.recentlyVisitedItems.splice(isInList, 1);
        state.recentlyVisitedItems = [id, ...state.recentlyVisitedItems];
      } else {
        if (state.recentlyVisitedItems.length < 8) {
          state.recentlyVisitedItems = [id, ...state.recentlyVisitedItems];
        } else {
          state.recentlyVisitedItems.splice(
            state.recentlyVisitedItems.length - 1,
            1
          );
          state.recentlyVisitedItems = [id, ...state.recentlyVisitedItems];
        }
      }
      //total length =8
      //1 If product is already in List
      //2. If product is new to list and list length is <8
      //3. If prodct is new to list and list length is 8
    },
  },
});

const store = configureStore({
  reducer: {
    globalReducer: globalReducer.reducer,
  },
});
export const globalActions = globalReducer.actions;
export default store;
