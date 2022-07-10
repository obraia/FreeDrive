import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TbHelp, TbSettings } from 'react-icons/tb';
import { toggleTheme } from '../../../../../../infrastructure/redux/reducers/theme';
import { RootState } from '../../../../../../infrastructure/redux/store';
import { Container, FirstLetter, HeaderButton, RightElements, Title } from './styles';
import { SearchBar } from '../../searchbar';

const Header: React.FC = () => {
  const { theme } = useSelector((state: RootState) => state.theme);

  const dispatch = useDispatch();

  return (
    <Container>
      <Title onClick={() => dispatch(toggleTheme())}>FreeDrive</Title>
      <SearchBar width='35%' placeholder='Pesquisar no FreeDrive' onSearch={() => {}} />

      <RightElements>
        <HeaderButton>
          <TbHelp size={22} color={theme.colors.textBackground} />
        </HeaderButton>

        <HeaderButton>
          <TbSettings size={22} color={theme.colors.textBackground} />
        </HeaderButton>

        <HeaderButton>
          <FirstLetter>B</FirstLetter>
        </HeaderButton>
      </RightElements>
    </Container>
  );
};

export { Header };
