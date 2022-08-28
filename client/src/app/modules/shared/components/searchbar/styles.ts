import styled from 'styled-components'
import { darken, transparentize } from 'polished'
import { Button } from '../button/styles'

export const Container = styled.div<{ width?: string }>`
  width: ${({ width }) => width || '100%'};
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  padding: 5px 8px;
  gap: ${({ theme }) => theme.metrics.gap};
  border-radius: ${({ theme }) => theme.metrics.inner_radius};
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;

  &:focus-within {
    outline: 1px solid
      ${({ theme }) => transparentize(0.8, theme.colors.textBackground)};
  }
`

export const SearchButton = styled(Button)`
  height: 100%;
  aspect-ratio: 1;
  border: none;
  background-color: transparent;
  border-radius: 100%;

  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.colors.background)};
  }

  &:active {
    background-color: ${({ theme }) => darken(0.08, theme.colors.background)};
  }
`

export const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  font-size: 16px;
  font-weight: lighter;
  color: ${({ theme }) => theme.colors.textBackground};
`

export const SearchList = styled.ul`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: calc(100% + ${({ theme }) => theme.metrics.margin});
  gap: ${({ theme }) => theme.metrics.gap};
  padding: ${({ theme }) => theme.metrics.padding};
  border: 1px solid
    ${({ theme }) => transparentize(0.8, theme.colors.textBackground)};
  border-radius: ${({ theme }) => theme.metrics.inner_radius};
  background-color: ${({ theme }) => theme.colors.background};
`

export const SearchListItem = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.metrics.gap};
  padding: ${({ theme }) => theme.metrics.padding};
  border-radius: ${({ theme }) => theme.metrics.inner_radius};
  background-color: ${({ theme }) => theme.colors.background};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.colors.background)};
  }
`
