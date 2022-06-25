import { lighten } from 'polished';
import styled from 'styled-components';
import { Button } from '../button/styles';

export const Container = styled.div`
  grid-area: topbar;
  width: 100%;
  height: min-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.metrics.padding};
  gap: ${({ theme }) => theme.metrics.gap};
  border-radius: ${({ theme }) => theme.metrics.radius};
  background-color: ${({ theme }) => lighten(0.08, theme.colors.background)};
  color: ${({ theme }) => theme.colors.primary};
`;

export const TopbarButton = styled(Button)`
  padding: ${({ theme }) => theme.metrics.padding};
  gap: ${({ theme }) => theme.metrics.gap};
  border-radius: ${({ theme }) => theme.metrics.inner_radius};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textBackground};
`;
