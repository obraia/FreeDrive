import styled from 'styled-components';
import { lighten, transparentize } from 'polished';
import { Button } from '../../../../shared/components/button/styles';

export const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.metrics.gap};
  padding: ${({ theme }) => theme.metrics.padding};
`;

export const Title = styled.h1`
  font-size: 14px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.textBackground};
`;

export const SortButton = styled(Button)`
  padding: ${({ theme }) => theme.metrics.padding};
  gap: ${({ theme }) => theme.metrics.gap};
  border-radius: ${({ theme }) => theme.metrics.inner_radius};
  color: ${({ theme }) => theme.colors.textBackground};
`;

export const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.metrics.gap};
  padding: ${({ theme }) => theme.metrics.padding};
`;

export const Folder = styled.div`
  height: 54px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 15px;
  gap: ${({ theme }) => theme.metrics.gap};
  border: 1px solid ${({ theme }) => transparentize(0.8, theme.colors.textBackground)};
  border-radius: ${({ theme }) => theme.metrics.radius};
  background-color: ${({ theme }) => lighten(0.05, theme.colors.background)};
  color: ${({ theme }) => theme.colors.textBackground};
  font-size: 12px;

  &:hover {
    background-color: #00000010;
  }

  &.selected {
    border-color: ${({ theme }) => transparentize(0.8, theme.colors.primary)};
    background-color: ${({ theme }) => transparentize(0.8, theme.colors.primary)};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const FavoriteLabel = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 12px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => lighten(0.05, theme.colors.textBackground)};
  border-radius: 50%;
`;
