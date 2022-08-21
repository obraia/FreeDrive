import React from 'react'
import { MoonLoader } from 'react-spinners'
import { useSelector } from 'react-redux'
import { Container } from './styles'
import { RootState } from '../../../../../infrastructure/redux/store'

interface Props {
  uploading: boolean
  quantity: number
}

const Uploading: React.FC<Props> = (props) => {
  const { theme } = useSelector((state: RootState) => state.theme)

  if (!props.uploading) return null

  return (
    <Container>
      <MoonLoader size={28} color={theme.colors.primary} />
      Fazendo upload de {props.quantity} arquivos...
    </Container>
  )
}

export { Uploading }
