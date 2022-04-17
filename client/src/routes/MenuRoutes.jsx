import { useContext } from 'react';
import { LocalStorage } from '../contexts/useLocalStorage';

const MenuRoutes = () => {
  const { userToken } = useContext(LocalStorage);

  const sidebarRoutes = [
    { id: 1, icon: 'fa-solid fa-book-atlas', name: 'Dashboard', path: '/' },
    { id: 2, icon: 'fa-regular fa-calendar-check', name: 'Booking', path: '' },
    {
      id: 3,
      icon: 'fa-solid fa-user-gear',
      name: 'Profile',
      path: `/users/${userToken.id}`
    }
  ];

  return { sidebarRoutes };
};

export default MenuRoutes;
