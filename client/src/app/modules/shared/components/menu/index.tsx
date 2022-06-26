import React from 'react';
import { AiOutlineApi } from 'react-icons/ai';
import { TbApi, TbHeart, TbHome, TbTrash } from 'react-icons/tb';
import { useLocation } from 'react-router-dom';

import { Container, MenuItem, MenuItems } from './styles';

export interface Props {
  width?: string;
}

const Menu: React.FC<Props> = (props) => {
  const { pathname } = useLocation();

  const items = [
    {
      id: 1,
      name: 'Início',
      path: '/',
      icon: TbHome,
    },
    {
      id: 2,
      name: 'Favoritos',
      path: '/favorites',
      icon: TbHeart,
    },
    {
      id: 3,
      name: 'API',
      path: '/api',
      icon: AiOutlineApi,
    },
    {
      id: 4,
      name: 'Lixeira',
      path: '/trash',
      icon: TbTrash,
    },
  ];

  function renderItems() {
    return items.map((i) => (
      <MenuItem key={i.id} className={pathname === i.path ? 'active' : ''} to={i.path}>
        {<i.icon size={20} />}
        {i.name}
      </MenuItem>
    ));
  }

  return (
    <Container>
      <MenuItems>{renderItems()}</MenuItems>
    </Container>
  );
};

export { Menu };
