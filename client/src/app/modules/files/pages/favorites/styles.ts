import styled, { css } from 'styled-components';
import { lighten, transparentize } from 'polished';

export const Container = styled.div<{ isDragOver?: Boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  border-radius: ${({ theme }) => theme.metrics.radius};
  background-color: ${({ theme }) => lighten(0.05, theme.colors.background)};
  overflow-y: auto;

  ${({ theme, isDragOver }) =>
    isDragOver &&
    css`
      border: 3px solid ${theme.colors.primary};
      overflow-y: hidden;
      pointer-events: none;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${transparentize(0.5, theme.colors.primary)};
        z-index: 1000;
      }
    `};

  & > input[type='file'] {
    display: none;
  }
`;
