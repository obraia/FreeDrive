import styled from 'styled-components'
import { lighten, transparentize } from 'polished'

export const Container = styled.div`
  grid-area: storage;
  width: ${({ theme }) => theme.metrics.menu_width};
  height: min-content;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.metrics.padding};
  gap: ${({ theme }) => theme.metrics.gap};
  border-radius: ${({ theme }) => theme.metrics.radius};
  background-color: ${({ theme }) => lighten(0.05, theme.colors.background)};
  transition: .2s;

  @media (max-width: ${({ theme }) => theme.metrics.desktop_small}) {
    width: 52px;
  }

  @media (max-width: ${({ theme }) => theme.metrics.tablet_small}) {
    height: auto;
    justify-content: center;
    display: none;
    
  }
`

export const Text = styled.p`
  font-size: 13px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textBackground};

  @media (max-width: ${({ theme }) => theme.metrics.desktop_small}) {
    display: none;
  }
`

export const Progress = styled.div<{ progress: string }>`
  width: 100%;
  height: 10px;
  position: relative;
  background-color: ${({ theme }) => lighten(0.1, theme.colors.background)};
  border-radius: ${({ theme }) => theme.metrics.radius};
  border: 1px solid
    ${({ theme }) => transparentize(0.8, theme.colors.textBackground)};

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ progress }) => progress};
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.metrics.radius};
    transition: width 0.2s ease-in-out;
  }
`

export const TextInfo = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textBackground};

  @media (max-width: ${({ theme }) => theme.metrics.desktop_small}) {
    display: none;
  }
`
