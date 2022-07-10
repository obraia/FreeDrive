import React from 'react'
import { TbFile, TbHeart, TbHome, TbTrash } from 'react-icons/tb'
import { useLocation } from 'react-router-dom'

import { Container, MenuItem, MenuItems } from './styles'

const Menu: React.FC = () => {
  const { pathname } = useLocation()

  const items = [
    {
      id: 1,
      name: 'Início',
      path: '/drive',
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
      name: 'Arquivos estáticos',
      path: '/static',
      icon: TbFile,
    },
    {
      id: 4,
      name: 'Lixeira',
      path: '/trash',
      icon: TbTrash,
    },
  ]

  function renderItems() {
    return items.map((i) => (
      <MenuItem
        key={i.id}
        className={pathname === i.path ? 'active' : ''}
        to={i.path}
      >
        {<i.icon size={20} />}
        {i.name}
      </MenuItem>
    ))
  }

  return (
    <Container>
      <MenuItems>{renderItems()}</MenuItems>
    </Container>
  )
}

export { Menu }
