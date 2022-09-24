import { lighten } from 'polished';
import styled from 'styled-components';
import { Button } from '../../button/styles';

export const Container = styled.header`
  grid-area: header;
  height: ${({ theme }) => theme.metrics.header_height};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.metrics.gap};
  padding: ${({ theme }) => theme.metrics.padding};
  border-radius: ${({ theme }) => theme.metrics.radius};
  background-color: ${({ theme }) => lighten(0.05, theme.colors.background)};
`;

export const Title = styled.h1`
  width: ${({ theme }) => theme.metrics.menu_width};
  margin-left: ${({ theme }) => theme.metrics.margin};
  white-space: nowrap;
  font-size: 24px;
  font-weight: lighter;
  color: ${({ theme }) => theme.colors.textBackground};

  @media (max-width: ${({ theme }) => theme.metrics.desktop_small}) {
    display: none;
  }
`;

export const HeaderButton = styled(Button)<{ active?: boolean }>`
  width: 48px;
  height: 48px;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 100%;
  color: ${({ theme }) => theme.colors.textBackground};
`;

export const FirstLetter = styled.p`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const RightElements = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: end;
  gap: ${({ theme }) => theme.metrics.gap};
  margin-left: auto;
`;
