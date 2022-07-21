import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const apikey = "APIKEY_FROM_FIREBASE"; //firebase specific removed
const Url =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
const signupUrl =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
const databaseApi = "https://shopping-390d4-default-rtdb.firebaseio.com";
export async function signUpAUser(email, password) {
  const response = await axios.post(signupUrl + apikey, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  return response.data;
}
export async function signInAUser(email, password) {
  const response = await axios.post(Url + apikey, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  return response.data;
}

export function addUserToDatabase(userData) {
  return axios.post(databaseApi + "/shoppingUsers.json", userData);
}

export async function getUserDetails(userId) {
  const users_data = await axios.get(databaseApi + "/shoppingUsers.json");
  for (const key in users_data.data) {
    if (users_data.data[key].userId == userId) {
      return users_data.data[key];
    }
  }
  return;
}

export async function addCartItems(cartProducts) {
  const curUserId = await AsyncStorage.getItem("curUser");
  return axios.post(databaseApi + "/cartProducts.json", {
    userId: curUserId,
    ...cartProducts,
  });
}

export async function updateCartItemQuantity(cartProducts) {
  const response = await axios.get(
    databaseApi +
      `/cartProducts.json?orderBy="cartItemId"&equalTo="${cartProducts.cartItemId}"`
  );
  const curUserId = await AsyncStorage.getItem("curUser");
  const cartItem = Object.keys(response.data)[0];
  if (cartProducts.quantity == 0) {
    return axios.delete(databaseApi + `/cartProducts/${cartItem}.json`);
  }
  return axios.patch(databaseApi + `/cartProducts/${cartItem}.json`, {
    userId: curUserId,
    ...cartProducts,
  });
}

export async function getAllCartItems(curUserId) {
  const response = await axios.get(
    databaseApi + `/cartProducts.json?orderBy="userId"&equalTo="${curUserId}"`
  );
  const cartItems = [];
  for (const key in response.data) {
    const temp = {
      ...response.data[key],
    };
    cartItems.push(temp);
  }
  return cartItems;
}

export async function getAllSavedItems(curUserId) {
  const response = await axios.get(
    databaseApi + `/savedProducts.json?orderBy="userId"&equalTo="${curUserId}"`
  );
  const savedcartItems = [];
  for (const key in response.data) {
    const temp = {
      ...response.data[key],
    };
    savedcartItems.push(temp);
  }
  return savedcartItems;
}

export async function getAllWishListItems(curUserId) {
  const response = await axios.get(
    databaseApi +
      `/wishListProducts.json?orderBy="userId"&equalTo="${curUserId}"`
  );
  const wishListProducts = [];
  for (const key in response.data) {
    const temp = {
      ...response.data[key],
    };
    wishListProducts.push(temp);
  }

  return wishListProducts;
}

export async function addRemoveWishListItem(wishListProduct) {
  if (wishListProduct.isInWishList == false) {
    const response = await axios.get(
      databaseApi +
        `/wishListProducts.json?orderBy="wishListItemId"&equalTo="${wishListProduct.wishListItemId}"`
    );
    const wishListItem = Object.keys(response.data)[0];
    return axios.delete(databaseApi + `/wishListProducts/${wishListItem}.json`);
  } else {
    return axios.post(databaseApi + `/wishListProducts.json`, wishListProduct);
  }
}

export async function updateSavedItems(savedProduct) {
  if (savedProduct.toRemove == true) {
    const response = await axios.get(
      databaseApi +
        `/savedProducts.json?orderBy="savedItemId"&equalTo="${savedProduct.savedItemId}"`
    );

    const savedItem = Object.keys(response.data)[0];

    return axios.delete(databaseApi + `/savedProducts/${savedItem}.json`);
  } else {
    return axios.post(databaseApi + `/savedProducts.json`, savedProduct);
  }
}

export async function getAllOrderedItems(curUserId) {
  const response = await axios.get(
    databaseApi +
      `/orderedProducts.json?orderBy="userId"&equalTo="${curUserId}"`
  );
  const orderedProducts = [];
  for (const key in response.data) {
    const temp = {
      ...response.data[key],
    };
    orderedProducts.push(temp.orderedItems);
  }
  console.log("orderedProducts", orderedProducts);
  return orderedProducts;
}

export async function addOrderedItems(orderedProducts) {
  return axios.post(databaseApi + "/orderedProducts.json", orderedProducts);
}
export async function addRecentlyVisited(recentlyVisited) {
  const curUserId = await AsyncStorage.getItem("curUser");
  if (recentlyVisited.length == 1)
    return axios.post(databaseApi + "/recentProducts.json", {
      userId: curUserId,
      ids: recentlyVisited,
    });
  else {
    const response = await axios.get(
      databaseApi +
        `/recentProducts.json?orderBy="userId"&equalTo="${curUserId}"`
    );

    const recentItem = Object.keys(response.data)[0];

    return axios.patch(databaseApi + `/recentProducts/${recentItem}.json`, {
      userId: curUserId,
      ids: recentlyVisited,
    });
  }
}

export async function getAllRecentItems(curUserId) {
  const response = await axios.get(
    databaseApi + `/recentProducts.json?orderBy="userId"&equalTo="${curUserId}"`
  );
  const recentProducts = [];
  for (const key in response.data) {
    const temp = {
      ...response.data[key],
    };
    recentProducts.push(temp);
  }
  return recentProducts[0].ids;
}
