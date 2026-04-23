import { rootReducer } from './root-reducer';
import { ingredientsReducer } from './slices/ingredients-slice';
import { feedReducer } from './slices/feed-slice';
import { profileOrdersReducer } from './slices/profile-orders-slice';
import { userReducer } from './slices/user-slice';
import { orderDetailsReducer } from './slices/order-details-slice';
import { burgerConstructorReducer } from './slices/burger-constructor-slice';

describe('rootReducer', () => {
  it('инициализирует корректный initial state', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    const initAction = { type: '@@INIT' } as const;

    expect(state).toEqual({
      ingredients: ingredientsReducer(undefined, initAction),
      feed: feedReducer(undefined, initAction),
      profileOrders: profileOrdersReducer(undefined, initAction),
      user: userReducer(undefined, initAction),
      orderDetails: orderDetailsReducer(undefined, initAction),
      burgerConstructor: burgerConstructorReducer(undefined, initAction)
    });
  });
});
