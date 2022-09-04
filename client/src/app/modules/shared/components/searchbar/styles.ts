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
  gap: 5px;
  padding: 5px;
  border: 1px solid
    ${({ theme }) => transparentize(0.8, theme.colors.textBackground)};
  border-radius: ${({ theme }) => theme.metrics.inner_radius};
  background-color: ${({ theme }) => theme.colors.background};
  list-style: none;
`

export const SearchListItem = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.metrics.gap};
  padding: ${({ theme }) => theme.metrics.padding};
  border-radius: ${({ theme }) => theme.metrics.inner_radius};
  background-color: ${({ theme }) => theme.colors.background};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.colors.background)};
  }
`

export const SearchListItemName = styled.span`
  width: 100%;
  display: inline-block;
  color: ${({ theme }) => theme.colors.textBackground};
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  strong {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const SearchListItemIcon = styled.span`
  min-width: 15px;
  min-height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.textBackground};
  color: ${({ theme }) => theme.colors.background};
  font-size: 8px;
`

export const SearchListItemDate = styled.span`
  color: ${({ theme }) => transparentize(0.5, theme.colors.textBackground)};
  font-size: 12px;
  white-space: nowrap;
`
