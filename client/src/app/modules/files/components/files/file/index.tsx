import React from 'react'
import { TbHeart } from 'react-icons/tb'
import { useDrag } from 'react-dnd'
import { Preview } from '../preview'
import { IFileChild } from '../../../../../../infrastructure/services/folder/interfaces'
import { middleTruncateString } from '../../../../shared/utils/formatters/string.formatter'
import { Container, FavoriteLabel, Name } from './styles'

interface Props {
  file: IFileChild
  className?: string
  onMouseDownCapture?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onContextMenu?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const File: React.FC<Props> = (props) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'FILE',
    item: {
      type: 'FILE',
      id: props.file._id,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      didDrop: monitor.didDrop(),
    }),
  })

  return (
    <Container
      ref={dragRef}
      id={'file_' + props.file._id}
      isDragging={isDragging}
      className={props.className}
      onMouseDownCapture={props.onMouseDownCapture}
      onContextMenu={props.onContextMenu}
    >
      {props.file.favorite && <FavoriteLabel children={<TbHeart />} />}
      <Preview file={props.file} />
      <Name>{middleTruncateString(props.file.originalName, 15)}</Name>
    </Container>
  )
}

export { File }
