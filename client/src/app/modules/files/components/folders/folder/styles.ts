import styled, { css } from 'styled-components';
import { lighten, transparentize } from 'polished';

export const Container = styled.section<{ isOver?: Boolean; isDragging?: Boolean }>`
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

  ${({ isOver }) =>
    isOver &&
    css`
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => lighten(0.05, theme.colors.background)};
    `}

  ${({ isDragging }) =>
    isDragging &&
    css`
      border: 3px dashed ${({ theme }) => theme.colors.primary};
      background: transparent;
      color: transparent !important;
      cursor: grabbing;

      s > * {
        opacity: 0;
      }
    `}
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
