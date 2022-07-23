import React from 'react'
import { useSelector } from 'react-redux'
import { Ellipsis } from 'react-spinners-css'
import { RootState } from '../../../../../../infrastructure/redux/store'

import { Container } from './styles'

const Loading: React.FC = () => {
  const { theme } = useSelector((state: RootState) => state.theme)

  return (
    <Container>
      <Ellipsis size={50} color={theme.colors.primary} />
    </Container>
  )
}

export { Loading }
