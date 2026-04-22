import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const { pathname } = useLocation();
  const isConstructorRoute =
    pathname === '/' || pathname.startsWith('/ingredients/');
  const isFeedRoute = pathname.startsWith('/feed');
  const isProfileRoute = pathname.startsWith('/profile');

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <Link
            to='/'
            className={`${styles.link} ${isConstructorRoute ? styles.link_active : ''}`}
          >
            <BurgerIcon type={isConstructorRoute ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </Link>
          <Link
            to='/feed'
            className={`${styles.link} ${isFeedRoute ? styles.link_active : ''}`}
          >
            <ListIcon type={isFeedRoute ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </Link>
        </div>
        <Link to='/' className={styles.logo}>
          <Logo className='' />
        </Link>
        <div className={styles.link_position_last}>
          <Link
            to='/profile'
            className={`${styles.link} ${isProfileRoute ? styles.link_active : ''}`}
          >
            <ProfileIcon type={isProfileRoute ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </Link>
        </div>
      </nav>
    </header>
  );
};
