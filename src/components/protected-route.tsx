import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { selectUser, selectUserLoading } from '@selectors';
import { Preloader } from '@ui';
import { useSelector } from '../services/store';

type TProtectedRouteProps = {
  component: ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  component,
  onlyUnAuth = false
}) => {
  const location = useLocation();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectUserLoading);
  const isAuthorized = Boolean(user);

  if (isLoading) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuthorized) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuthorized) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return component;
};
