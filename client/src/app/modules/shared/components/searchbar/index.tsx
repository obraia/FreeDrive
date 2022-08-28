import React from 'react'
import { TbSearch } from 'react-icons/tb'
import { VscSettings } from 'react-icons/vsc'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../infrastructure/redux/store'

import { SearchButton, Container, Input, SearchList, SearchListItem } from './styles'

export interface Props {
  width?: string
  onSearch: (value: string) => void
  items?: string[]
  placeholder?: string
  autoFocus?: boolean
}

const SearchBar: React.FC<Props> = (props) => {
  const { theme } = useSelector((state: RootState) => state.theme)

  return (
    <Container width={props.width}>
      <SearchButton>
        <TbSearch size={22} color={theme.colors.textBackground} />
      </SearchButton>

      <Input
        type="search"
        onChange={(e) => props.onSearch(e.target.value.trim())}
        placeholder={props.placeholder}
        autoFocus={props.autoFocus}
      />

      <SearchButton>
        <VscSettings size={22} color={theme.colors.textBackground} />
      </SearchButton>

      {/* <SearchList>
        <SearchListItem>james-web.jpeg</SearchListItem>
        <SearchListItem>
          main_image_galaxies_stephans_quintet_sq_nircam_miri_final-5mb.jpeg
        </SearchListItem>
      </SearchList> */}
    </Container>
  )
}

export { SearchBar }
