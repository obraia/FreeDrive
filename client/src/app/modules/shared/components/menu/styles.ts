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
  background-color: ${({ theme }) => lighten(0.08, theme.colors.background)};
`;

export const MenuItems = styled.nav`
  width: 100%;
  height: min-content;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.metrics.gap};
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
  text-decoration: none;
  cursor: pointer;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => transparentize(0.8, theme.colors.primary)};
    pointer-events: none;
  }
`;
