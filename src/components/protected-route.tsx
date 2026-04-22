import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../utils/cookie';

type TProtectedRouteProps = {
  component: ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  component,
  onlyUnAuth = false
}) => {
  const location = useLocation();
  const isAuthorized =
    Boolean(localStorage.getItem('accessToken')) ||
    Boolean(getCookie('accessToken'));

  if (onlyUnAuth && isAuthorized) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuthorized) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return component;
};
