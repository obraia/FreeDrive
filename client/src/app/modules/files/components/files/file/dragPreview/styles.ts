import styled from 'styled-components';
import { lighten, transparentize } from 'polished';

export const Container = styled.div`
  border: 1px solid red;
`;

export const Name = styled.div`
  font-size: 14px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.textBackground};
`;

export const File = styled.div<{ zIndex: number; top: number; left: number }>`
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  padding: 0 20px;
  gap: ${({ theme }) => theme.metrics.gap};
  border: 1px solid ${({ theme }) => transparentize(0.8, theme.colors.textBackground)};
  border-radius: ${({ theme }) => theme.metrics.radius};
  background-color: ${({ theme }) => lighten(0.05, theme.colors.background)};
  color: ${({ theme }) => theme.colors.textBackground};
  text-align: center;
  z-index: ${({ zIndex }) => zIndex};

  &:hover {
    background-color: #00000010;
  }

  &.selected {
    border-color: ${({ theme }) => transparentize(0.8, theme.colors.primary)};
    background-color: ${({ theme }) => transparentize(0.8, theme.colors.primary)};
    color: ${({ theme }) => theme.colors.primary};

    ${Name} {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
