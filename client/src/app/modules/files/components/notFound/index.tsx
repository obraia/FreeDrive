import React from 'react'
import { useSelector } from 'react-redux'
import { IconType } from 'react-icons'
import { transparentize } from 'polished'
import { RootState } from '../../../../../infrastructure/redux/store'
import { Container, Title } from './styles'

interface Props {
  title: string
  icon: IconType
}

const NotFound: React.FC<Props> = (props) => {
  const { theme } = useSelector((state: RootState) => state.theme)

  return (
    <Container>
      <props.icon
        size={72}
        color={transparentize(0.8, theme.colors.textBackground)}
      />
      <Title>{props.title}</Title>
    </Container>
  )
}

export { NotFound }
