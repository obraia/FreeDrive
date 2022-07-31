import React from 'react'
import { useSelector } from 'react-redux'
import { Ellipsis } from 'react-spinners-css'
import { RootState } from '../../../../../../infrastructure/redux/store'
import { Container } from './styles'

interface Props {
  loading?: boolean
}

const Loading = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { theme } = useSelector((state: RootState) => state.theme)

  return (
    <Container ref={ref}>
      {props.loading && <Ellipsis size={50} color={theme.colors.primary} />}
    </Container>
  )
})

export { Loading }
