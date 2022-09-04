import React, { useRef, useState } from 'react'
import { TbSearch } from 'react-icons/tb'
import { VscSettings } from 'react-icons/vsc'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../infrastructure/redux/store'

import {
  SearchButton,
  Container,
  Input,
  SearchList,
  SearchListItem,
  SearchListItemName,
  SearchListItemDate,
} from './styles'

export interface SearchItem {
  id: string
  name: string
  date: string
}

export interface Props {
  width?: string
  onChange: (value: string) => void
  onSearch: (value: string) => void
  onClear?: () => void
  items?: SearchItem[]
  placeholder?: string
  defaultValue?: string
  autoFocus?: boolean
}

const SearchBar: React.FC<Props> = (props) => {
  const { theme } = useSelector((state: RootState) => state.theme)
  const [onFocus, setOnFocus] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = () => {
    if (!inputRef.current) return

    if (!inputRef.current.value) {
      return inputRef.current.focus()
    }

    props.onSearch(inputRef.current.value)
  }

  const renderSearchList = () => {
    if (!props.items?.length || !onFocus) return

    const bold = new RegExp(inputRef.current?.value || '', 'gi')

    const boldText = (text: string) => {
      return text.replace(bold, (match) => {
        return `<strong>${match}</strong>`
      })
    }

    return (
      <SearchList>
        {props.items.map((item) => (
          <SearchListItem key={item.id}>
            <SearchListItemName
              dangerouslySetInnerHTML={{ __html: boldText(item.name) }}
            />
            <SearchListItemDate>{item.date}</SearchListItemDate>
          </SearchListItem>
        ))}
      </SearchList>
    )
  }

  return (
    <Container width={props.width}>
      <SearchButton onClick={handleSearch}>
        <TbSearch size={22} color={theme.colors.textBackground} />
      </SearchButton>

      <Input
        type="search"
        ref={inputRef}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        autoFocus={props.autoFocus}
        onFocus={() => setOnFocus(true)}
        onBlur={() => setOnFocus(false)}
        onChange={(e) => props.onChange(e.target.value.trim())}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch()
        }}
      />

      <SearchButton>
        <VscSettings size={22} color={theme.colors.textBackground} />
      </SearchButton>

      {renderSearchList()}
    </Container>
  )
}

export { SearchBar }
