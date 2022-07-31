import React from 'react'
import { TbHeart } from 'react-icons/tb'
import { useDrag } from 'react-dnd'
import { Preview } from '../preview'
import { middleTruncateString } from '../../../../shared/utils/formatters/string.formatter'
import { Container, FavoriteLabel, Name } from './styles'
import { IFile } from '../../../../../../infrastructure/services/file/file.service.d'

interface Props {
  file: IFile
  className?: string
  onMouseDownCapture?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onContextMenu?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const File = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'FILE',
    item: {
      type: 'FILE',
      id: props.file.id,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      didDrop: monitor.didDrop(),
    }),
  })

  return (
    <Container
      ref={ref}
      id={'file_' + props.file.id}
      isDragging={isDragging}
      className={props.className}
      onMouseDownCapture={props.onMouseDownCapture}
      onContextMenu={props.onContextMenu}>
      {props.file.favorite && <FavoriteLabel children={<TbHeart />} />}
      <Preview file={props.file} />
      <Name>{middleTruncateString(props.file.originalName, 15)}</Name>
    </Container>
  )
})

export { File }
