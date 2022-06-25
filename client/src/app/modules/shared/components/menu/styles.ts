import styled from 'styled-components';
import { lighten } from 'polished';
import { Button } from '../button/styles';

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

export const MenuItem = styled(Button)`
  width: 100%;
  height: 40px;
  justify-content: start;
  padding: ${({ theme }) => theme.metrics.padding};
  gap: ${({ theme }) => theme.metrics.gap};
  border-radius: ${({ theme }) => theme.metrics.inner_radius};
  color: ${({ theme }) => theme.colors.textBackground};
  font-size: 13px;
  cursor: pointer;
`;
