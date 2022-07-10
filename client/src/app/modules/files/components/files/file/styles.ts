import styled, { css } from 'styled-components';
import { lighten, transparentize } from 'polished';

export const Name = styled.div`
  font-size: 14px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.textBackground};
`;

export const Container = styled.section<{ isDragging?: Boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  padding: ${({ theme }) => theme.metrics.padding};
  gap: ${({ theme }) => theme.metrics.gap};
  border: 1px solid ${({ theme }) => transparentize(0.8, theme.colors.textBackground)};
  border-radius: ${({ theme }) => theme.metrics.radius};
  background-color: ${({ theme }) => lighten(0.05, theme.colors.background)};
  color: ${({ theme }) => theme.colors.textBackground};
  text-align: center;
  transition: background-color 0.2s;

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

  ${({ isDragging }) =>
    isDragging &&
    css`
      border: 3px dashed ${({ theme }) => theme.colors.primary};
      background: transparent;
      cursor: grabbing;

      > * {
        opacity: 0;
      }
    `}
`;

export const FavoriteLabel = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 18px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.textBackground};
  background-color: ${({ theme }) => lighten(0.05, theme.colors.background)};
  border-radius: 50%;
`;
