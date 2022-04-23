import { useContext } from 'react';
import { LocalStorage } from '../contexts/useLocalStorage';

const MenuRoutes = () => {
  const { userToken } = useContext(LocalStorage);

  const sidebarRoutes = [
    { id: 1, icon: 'fa-solid fa-book-atlas', name: 'Dashboard', path: '/' },
    {
      id: 2,
      icon: 'fa-regular fa-calendar-check',
      name: 'Booking',
      path: '/booking'
    },
    {
      id: 3,
      icon: 'fa-solid fa-user-gear',
      name: 'Profile',
      path: `/users/${userToken.id}`
    },
    {
      id: 4,
      icon: 'fa-solid fa-file-circle-plus',
      name: 'Insert',
      path: '/items/add'
    },
    {
      id: 5,
      icon: 'fa-solid fa-clipboard-list',
      name: 'Apporve',
      path: '/approve'
    }
  ];

  return { sidebarRoutes };
};

export default MenuRoutes;
