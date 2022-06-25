import styled from 'styled-components';
import { lighten, transparentize } from 'polished';
import { Button } from '../../../shared/components/button/styles';

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
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.metrics.gap};
  padding: ${({ theme }) => theme.metrics.padding};
`;

export const File = styled.div<{ selected?: Boolean }>`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: ${({ theme }) => theme.metrics.padding};
  gap: ${({ theme }) => theme.metrics.gap};
  border: 1px solid ${({ theme }) => transparentize(0.8, theme.colors.textBackground)};
  border-radius: ${({ theme }) => theme.metrics.radius};
  background-color: ${({ theme }) => lighten(0.08, theme.colors.background)};
  color: ${({ theme }) => theme.colors.textBackground};
  transition: background-color 0.2s;

  &:hover {
    background-color: #00000010;
  }

  ${({ theme, selected }) =>
    selected &&
    `
      border-color: ${transparentize(0.8, theme.colors.primary)};
      background-color: ${transparentize(0.8, theme.colors.primary)};
      color: ${theme.colors.primary};

      ${FileName} {
        color: ${theme.colors.primary};
      }
  `};

  > img,
  > video,
  > audio,
  > iframe,
  > svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.metrics.inner_radius};
  }
`;

export const FileName = styled.div`
  font-size: 14px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.textBackground};
`;
