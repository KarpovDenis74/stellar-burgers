import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearOrderModal,
  createOrder
} from '../../services/slices/burger-constructor-slice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { bun, ingredients, orderRequest, orderModalData } = useSelector(
    (store) => store.burgerConstructor
  );
  const constructorItems = { bun, ingredients };

  const onOrderClick = () => {
    const isAuthorized =
      Boolean(localStorage.getItem('accessToken')) ||
      Boolean(getCookie('accessToken'));

    if (!isAuthorized) {
      navigate('/login', { state: { from: location } });
      return;
    }

    if (!constructorItems.bun || orderRequest) return;
    dispatch(createOrder());
  };
  const closeOrderModal = () => {
    dispatch(clearOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
