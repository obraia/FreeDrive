import styled from 'styled-components'
import { lighten, transparentize } from 'polished'
import { Button } from '../../../../shared/components/button/styles'

export const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.metrics.gap};
  padding: ${({ theme }) => theme.metrics.padding};
`

export const Title = styled.h1`
  font-size: 14px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.textBackground};
`
