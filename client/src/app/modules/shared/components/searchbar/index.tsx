import React from "react";
import { TbSearch } from "react-icons/tb";
import { VscSettings } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../infrastructure/redux/store";

import { SearchButton, Container, Input } from "./styles";

export interface Props {
  width?: string;
  onSearch: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

const SearchBar: React.FC<Props> = (props) => {
  const { theme } = useSelector((state: RootState) => state.theme);

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
    </Container>
  );
};

export { SearchBar };
