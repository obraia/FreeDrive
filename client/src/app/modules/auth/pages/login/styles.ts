import styled, { css } from 'styled-components'
import { darken, lighten, transparentize } from 'polished'
import { Button } from '../../../shared/components/button/styles'

export const Container = styled.main`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => theme.metrics.padding};
  gap: ${({ theme }) => theme.metrics.gap};
  border-radius: ${({ theme }) => theme.metrics.radius};
  background-color: ${({ theme }) => theme.colors.background};
  overflow-y: auto;
`

export const Section = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.metrics.padding};
  gap: ${({ theme }) => theme.metrics.gap};
  border-radius: ${({ theme }) => theme.metrics.radius};
`

export const Form = styled.form`
  width: 340px;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.metrics.padding};
  gap: ${({ theme }) => theme.metrics.gap};
  border-radius: ${({ theme }) => theme.metrics.radius};
  border: 1px solid
    ${({ theme }) => transparentize(0.8, theme.colors.textBackground)};
  background-color: ${({ theme }) => lighten(0.05, theme.colors.background)};

  @media (max-width: ${({ theme }) => theme.metrics.mobile_large}) {
    width: 100%;
  }
`

export const RememberMe = styled.label<{ active?: boolean }>`
  width: fit-content;
  position: relative;
  display: flex;
  align-items: center;
  margin: 5px 0;
  gap: 5px;
  color: ${({ theme }) => theme.colors.textBackground};
  white-space: nowrap;
  font-size: 14px;
  transition: 0.2s;
  cursor: pointer;

  &::before {
    content: '';
    height: 100%;
    aspect-ratio: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.background};

    ${({ active }) =>
      active &&
      css`
        background-color: ${({ theme }) => theme.colors.primary};
      `}
  }

  &::after {
    content: '';
    height: calc(100% - 4px);
    aspect-ratio: 1;
    position: absolute;
    left: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.textPrimary};
    transition: 0.2s;

    ${({ active }) =>
      active &&
      css`
        left: auto;
        transform: translateX(150%);
      `}
  }
`

export const SubmitButton = styled(Button)`
  width: 100%;
  height: 38px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: ${({ theme }) => theme.metrics.radius};

  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.colors.primary)};
  }

  &:active {
    background-color: ${({ theme }) => darken(0.1, theme.colors.primary)};
  }

  &:focus {
    border: 1px solid ${({ theme }) => darken(0.1, theme.colors.primary)};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textBackground};
    cursor: auto;
  }
`
