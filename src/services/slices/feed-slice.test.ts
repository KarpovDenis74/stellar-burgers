import { feedReducer, fetchFeed } from './feed-slice';
import { TOrdersData } from '@utils-types';

const feedMock: TOrdersData = {
  orders: [
    {
      _id: 'order-1',
      status: 'done',
      name: 'Тестовый заказ',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      number: 1,
      ingredients: ['ing-1']
    }
  ],
  total: 10,
  totalToday: 2
};

describe('feed reducer', () => {
  it('обрабатывает pending', () => {
    const state = feedReducer(undefined, fetchFeed.pending('', undefined));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает fulfilled', () => {
    const state = feedReducer(
      undefined,
      fetchFeed.fulfilled(feedMock, '', undefined)
    );
    expect(state.data).toEqual(feedMock);
    expect(state.isLoading).toBe(false);
  });

  it('обрабатывает rejected', () => {
    const state = feedReducer(
      undefined,
      fetchFeed.rejected(new Error('feed failed'), '', undefined)
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('feed failed');
  });
});
