import { RootState } from '../store';

export const selectIngredients = (state: RootState) => state.ingredients.items;
export const selectIngredientById = (state: RootState, id?: string) =>
  state.ingredients.items.find((item) => item._id === id);
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;
export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;

export const selectFeedData = (state: RootState) => state.feed.data;
export const selectFeedOrders = (state: RootState) => state.feed.data.orders;
export const selectFeedLoading = (state: RootState) => state.feed.isLoading;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserName = (state: RootState) => state.user.user?.name;
export const selectUserLoading = (state: RootState) => state.user.isLoading;
export const selectAuthError = (state: RootState) => state.user.authError;
export const selectUpdateUserError = (state: RootState) =>
  state.user.updateUserError;

export const selectProfileOrders = (state: RootState) =>
  state.profileOrders.orders;
export const selectProfileOrdersLoading = (state: RootState) =>
  state.profileOrders.isLoading;

export const selectOrderDetails = (state: RootState) =>
  state.orderDetails.order;
export const selectOrderDetailsLoading = (state: RootState) =>
  state.orderDetails.isLoading;

export const selectBurgerConstructor = (state: RootState) =>
  state.burgerConstructor;
export const selectIsAuthorized = (state: RootState) =>
  Boolean(state.user.user);
