import { useEffect } from 'react';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  Location,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { fetchIngredients } from '../../services/slices/ingredients-slice';
import { fetchUser } from '../../services/slices/user-slice';
import { ProtectedRoute } from '../protected-route';
import { getCookie } from '../../utils/cookie';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { background?: Location };
  const background = state?.background;

  const dispatch = useDispatch();
  const { isLoading: isIngredientsLoading, error } = useSelector(
    (store) => store.ingredients
  );

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem('accessToken') || getCookie('accessToken')) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  const onCloseModal = () => navigate(-1);

  const constructorPage = isIngredientsLoading ? (
    <Preloader />
  ) : error ? (
    <div className={`${styles.error} text text_type_main-medium pt-4`}>
      {error}
    </div>
  ) : (
    <ConstructorPage />
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={constructorPage} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/login'
          element={<ProtectedRoute onlyUnAuth component={<Login />} />}
        />
        <Route
          path='/register'
          element={<ProtectedRoute onlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<ProtectedRoute onlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<ProtectedRoute onlyUnAuth component={<ResetPassword />} />}
        />
        <Route
          path='/profile'
          element={<ProtectedRoute component={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute component={<ProfileOrders />} />}
        />
        <Route
          path='/profile/orders/:number'
          element={<ProtectedRoute component={<OrderInfo />} />}
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={onCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title='Информация о заказе' onClose={onCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute
                component={
                  <Modal title='Информация о заказе' onClose={onCloseModal}>
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
