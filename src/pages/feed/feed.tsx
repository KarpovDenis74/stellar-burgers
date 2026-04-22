import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { selectFeedLoading, selectFeedOrders } from '@selectors';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/feed-slice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectFeedLoading);
  const orders = useSelector(selectFeedOrders);

  const handleGetFeeds = () => dispatch(fetchFeed());

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
