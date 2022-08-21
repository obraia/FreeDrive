import { lighten, transparentize } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  width: 375px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: calc(50% - 255px);
  bottom: 20px;
  padding: 20px 40px;
  gap: 10px;
  border-radius: ${({ theme }) => theme.metrics.radius};
  border: 1px solid
    ${({ theme }) => transparentize(0.8, theme.colors.textBackground)};
  background-color: ${({ theme }) => lighten(0.06, theme.colors.background)};
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.25);
  pointer-events: none;
  z-index: 3;
`
