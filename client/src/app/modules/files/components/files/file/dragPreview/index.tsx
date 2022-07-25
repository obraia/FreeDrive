import React from 'react'
import { XYCoord } from 'react-dnd'
import { BiFile } from 'react-icons/bi'
import { IFile } from '../../../../../../../infrastructure/services/file/file.service.d'
import { middleTruncateString } from '../../../../../shared/utils/formatters/string.formatter'
import { Container, File, Name } from './styles'

interface Props {
  file: IFile
  currentOffset: XYCoord | null
  children?: React.ReactNode
}
const getItemStyles = (currentOffset: XYCoord | null) => {
  if (!currentOffset) return { display: 'none' }

  const { x, y } = currentOffset

  return {
    transform: `translate(${x}px, ${y}px)`,
    filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.5))',
  }
}

const FileDragPreview: React.FC<Props> = (props) => {
  const renderFiles = () => {
    return Array.from(Array(3).keys()).map((_, i) => (
      <File zIndex={i} top={-i * 2} left={-i * 2}>
        <BiFile size={20} />
        <Name>{middleTruncateString(props.file.originalName, 15)}</Name>
      </File>
    ))
  }

  return (
    props.currentOffset && (
      <Container style={getItemStyles(props.currentOffset)}>
        {renderFiles()}
      </Container>
    )
  )
}

export { FileDragPreview }
