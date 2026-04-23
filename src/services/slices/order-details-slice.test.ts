import { orderDetailsReducer, fetchOrderByNumber } from './order-details-slice';
import { TOrder } from '@utils-types';

const orderMock: TOrder = {
  _id: 'order-1',
  status: 'done',
  name: 'Детали заказа',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  number: 999,
  ingredients: ['ing-1']
};

describe('orderDetails reducer', () => {
  it('обрабатывает pending', () => {
    const state = orderDetailsReducer(
      undefined,
      fetchOrderByNumber.pending('', 999)
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает fulfilled', () => {
    const state = orderDetailsReducer(
      undefined,
      fetchOrderByNumber.fulfilled(orderMock, '', 999)
    );
    expect(state.order).toEqual(orderMock);
    expect(state.isLoading).toBe(false);
  });

  it('обрабатывает rejected', () => {
    const state = orderDetailsReducer(
      undefined,
      fetchOrderByNumber.rejected(new Error('order failed'), '', 999)
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('order failed');
  });
});
