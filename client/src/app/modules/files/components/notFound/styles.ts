import { transparentize } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: 40px;
  gap: 10px;
  border-radius: ${({ theme }) => theme.metrics.radius};
  pointer-events: none;
  z-index: 3;
`

export const Title = styled.h1`
  text-align: center;
  font-size: 28px;
  font-weight: 800;
  color: ${({ theme }) => transparentize(0.8, theme.colors.textBackground)};
`
