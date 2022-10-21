import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash';
import { TbSettings } from 'react-icons/tb'
import { toggleTheme } from '../../../../../../infrastructure/redux/reducers/theme'
import { RootState } from '../../../../../../infrastructure/redux/store'
import { logout } from '../../../../../../infrastructure/redux/reducers/auth'
import { useFileService } from '../../../../../../infrastructure/services/file/file.service'
import { SearchBar, SearchItem } from '../../searchbar'
import { Container, FirstLetter, HeaderButton, RightElements, Title } from './styles'

const Header: React.FC = () => {
  const { theme } = useSelector((state: RootState) => state.theme)
  const { user } = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { getFiles } = useFileService()
  const [searchParams] = useSearchParams()

  const [searchItems, setSearchItems] = React.useState<SearchItem[]>([])
  const searchDebounceRef = React.useRef<_.DebouncedFunc<any>>()

  const firstLatter = user ? user.name[0] : '?'

  const handleThemeChange = () => {
    dispatch(toggleTheme())
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const handleChange = async (value: string) => {
    if(!value) {
      return setSearchItems([])
    }

    const search = _.debounce(async () => {    
      const files = await getFiles({
        page: 1,
        limit: 5,
        deleted: false,
        originalName: value,
      })
  
      setSearchItems(files.map(f => ({
        id: f.id,
        name: f.originalName,
        date: f.updatedAt ? new Date(f.updatedAt).toLocaleDateString() : '',
      })))
    }, 300)

    if(searchDebounceRef.current?.cancel) {
      searchDebounceRef.current.cancel()
    }

    searchDebounceRef.current = search

    search();
  }

  const handleSearch = (value: string) => {
    navigate(`/search?q=${value}`)
  }

  return (
    <Container>
      <Title onClick={handleThemeChange}>FreeDrive</Title>

      <SearchBar
        width="100%"
        placeholder="Pesquisar no FreeDrive"
        defaultValue={searchParams.get('q') || ''}
        onChange={handleChange}
        onSearch={handleSearch}
        items={searchItems}
      />

      <RightElements>
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
