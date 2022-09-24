import styled from 'styled-components'

export const Container = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas:
    'header header'
    'aside topbar'
    'aside pages';
  grid-template-columns: min-content 1fr;
  grid-template-rows: min-content min-content 1fr;
  position: relative;
  align-items: stretch;
  padding: ${({ theme }) => theme.metrics.padding};
  gap: ${({ theme }) => theme.metrics.gap};

  @media (max-width: ${({ theme }) => theme.metrics.tablet_small}) {
    grid-template-areas:
      'header header'
      'topbar topbar'
      'pages pages'
      'aside aside';
  }
`
