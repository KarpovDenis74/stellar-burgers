import { rootReducer } from './root-reducer';

describe('rootReducer', () => {
  it('инициализирует корректный initial state', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: {
        items: [],
        isLoading: false,
        error: null
      },
      feed: {
        data: {
          orders: [],
          total: 0,
          totalToday: 0
        },
        isLoading: false,
        error: null
      },
      profileOrders: {
        orders: [],
        isLoading: false,
        error: null
      },
      user: {
        user: null,
        isLoading: false,
        updateUserError: null,
        authError: null
      },
      orderDetails: {
        order: null,
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: [],
        orderRequest: false,
        orderModalData: null,
        orderError: null
      }
    });
  });
});
