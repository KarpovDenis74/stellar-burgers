import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/feed-slice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((store) => store.feed);
  const { orders } = data;

  const handleGetFeeds = () => dispatch(fetchFeed());

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
