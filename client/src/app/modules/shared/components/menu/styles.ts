import styled from 'styled-components';
import { lighten, transparentize } from 'polished';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  grid-area: menu;
  width: ${({ theme }) => theme.metrics.menu_width};
  height: 100%;
  display: flex;
  padding: ${({ theme }) => theme.metrics.padding};
  gap: ${({ theme }) => theme.metrics.gap};
  border-radius: ${({ theme }) => theme.metrics.radius};
  background-color: ${({ theme }) => lighten(0.05, theme.colors.background)};
  transition: .2s;

  @media (max-width: ${({ theme }) => theme.metrics.desktop_small}) {
    width: 52px;
  }

  @media (max-width: ${({ theme }) => theme.metrics.tablet_small}) {
    width: 100%;
  }
`;

export const MenuItems = styled.nav`
  width: 100%;
  height: min-content;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.metrics.gap};

  @media (max-width: ${({ theme }) => theme.metrics.tablet_small}) {
    flex-direction: row;
  }
`;

export const MenuItem = styled(Link)`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: ${({ theme }) => theme.metrics.padding};
  gap: ${({ theme }) => theme.metrics.gap};
  border-radius: ${({ theme }) => theme.metrics.inner_radius};
  color: ${({ theme }) => theme.colors.textBackground};
  font-size: 13px;
  white-space: nowrap;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => transparentize(0.8, theme.colors.primary)};
    pointer-events: none;
  }

  svg {
    min-width: 20px;
  }

  @media (max-width: ${({ theme }) => theme.metrics.desktop_small}) {
    justify-content: center;

    span {
      display: none;
    }
  }
`;

export const MenuItemName = styled.span`

`;