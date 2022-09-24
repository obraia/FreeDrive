import { lighten } from 'polished';
import styled from 'styled-components';
import { Button } from '../../../shared/components/button/styles';

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
  background-color: ${({ theme }) => lighten(0.05, theme.colors.background)};
  color: ${({ theme }) => theme.colors.textBackground};
  overflow-x: auto;
`;

export const Path = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
`;

export const RowButtons = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.metrics.tablet_small}) {
    display: none;
  }
`;

export const TopbarButton = styled(Button)`
  padding: ${({ theme }) => theme.metrics.padding};
  gap: ${({ theme }) => theme.metrics.gap};
  border-radius: ${({ theme }) => theme.metrics.inner_radius};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textBackground};
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.metrics.tablet_small}) {
    font-size: 14px;
  }
`;

export const Separator = styled.div`
  flex: 1;
  width: 1px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.background};
`;
