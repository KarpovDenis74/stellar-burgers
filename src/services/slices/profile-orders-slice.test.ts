import {
  profileOrdersReducer,
  fetchProfileOrders
} from './profile-orders-slice';
import { TOrder } from '@utils-types';

const ordersMock: TOrder[] = [
  {
    _id: 'order-1',
    status: 'done',
    name: 'Мой заказ',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    number: 100,
    ingredients: ['ing-1']
  }
];

describe('profileOrders reducer', () => {
  it('обрабатывает pending', () => {
    const state = profileOrdersReducer(
      undefined,
      fetchProfileOrders.pending('', undefined)
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает fulfilled', () => {
    const state = profileOrdersReducer(
      undefined,
      fetchProfileOrders.fulfilled(ordersMock, '', undefined)
    );
    expect(state.orders).toEqual(ordersMock);
    expect(state.isLoading).toBe(false);
  });

  it('обрабатывает rejected', () => {
    const state = profileOrdersReducer(
      undefined,
      fetchProfileOrders.rejected(new Error('orders failed'), '', undefined)
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('orders failed');
  });
});
