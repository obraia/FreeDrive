import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { TbHelp, TbSettings } from 'react-icons/tb'
import { toggleTheme } from '../../../../../../infrastructure/redux/reducers/theme'
import { RootState } from '../../../../../../infrastructure/redux/store'
import { logout } from '../../../../../../infrastructure/redux/reducers/auth'
import { SearchBar } from '../../searchbar'
import { Container, FirstLetter, HeaderButton, RightElements, Title } from './styles'

const Header: React.FC = () => {
  const { theme } = useSelector((state: RootState) => state.theme)
  const { user } = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const firstLatter = user ? user.name[0] : '?'

  const handleThemeChange = () => {
    dispatch(toggleTheme())
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <Container>
      <Title onClick={handleThemeChange}>FreeDrive</Title>
      <SearchBar
        width="35%"
        placeholder="Pesquisar no FreeDrive"
        onSearch={() => {}}
      />

      <RightElements>
        <HeaderButton>
          <TbHelp size={22} color={theme.colors.textBackground} />
        </HeaderButton>

        <HeaderButton>
          <TbSettings size={22} color={theme.colors.textBackground} />
        </HeaderButton>

        <HeaderButton onClick={handleLogout}>
          <FirstLetter>{firstLatter}</FirstLetter>
        </HeaderButton>
      </RightElements>
    </Container>
  )
}

export { Header }
