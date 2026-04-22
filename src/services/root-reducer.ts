import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients-slice';
import { feedReducer } from './slices/feed-slice';
import { profileOrdersReducer } from './slices/profile-orders-slice';
import { userReducer } from './slices/user-slice';
import { orderDetailsReducer } from './slices/order-details-slice';
import { burgerConstructorReducer } from './slices/burger-constructor-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer,
  user: userReducer,
  orderDetails: orderDetailsReducer,
  burgerConstructor: burgerConstructorReducer
});
