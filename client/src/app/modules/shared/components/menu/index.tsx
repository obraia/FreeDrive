import React, { Fragment } from 'react';
import { TbHeart, TbHome, TbTrash } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../infrastructure/redux/store';

import { Container, MenuItem, MenuItems } from './styles';

export interface Props {
  width?: string;
}

const Menu: React.FC<Props> = (props) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  const items = [
    {
      id: 1,
      name: 'Início',
      icon: TbHome,
      onClick: () => {},
    },
    {
      id: 2,
      name: 'Favoritos',
      icon: TbHeart,
      onClick: () => {},
    },
    {
      id: 3,
      name: 'Lixeira',
      icon: TbTrash,
      onClick: () => {},
    },
  ];

  function renderItems() {
    return items.map((i) => (
      <MenuItem key={i.id}>
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
