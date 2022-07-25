import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { FaFolder } from 'react-icons/fa'
import { TbHeart } from 'react-icons/tb'
import { IFolder } from '../../../../../../infrastructure/services/folder/folder.service.d'
import { ItemTypes } from '../../dragLayer'
import { Container, FavoriteLabel } from './styles'

interface Props {
  folder: IFolder
  className?: string
  onMouseDownCapture?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onContextMenu?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onDoubleClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onDrag?: (parentId: string) => Promise<void>
}

const Folder: React.FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, dragRef] = useDrag({
    type: ItemTypes.FOLDER,
    item: {
      type: ItemTypes.FOLDER,
      id: props.folder.id,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ isOver }, dropRef] = useDrop({
    accept: [ItemTypes.FILE, ItemTypes.FOLDER],
    drop(item: { type: string; id: string }) {
      if (props.onDrag && item.type === ItemTypes.FILE) {
        // props.onDrag([item.id], props.folder.id, 'File');
      } else if (
        props.onDrag &&
        item.type === ItemTypes.FOLDER &&
        item.id !== props.folder.id
      ) {
        // props.onDrag([item.id], props.folder.id, 'Folder');
      }
    },
    collect(monitor) {
      return {
        isOver: monitor.isOver() && monitor.getItem().id !== props.folder.id,
      }
    },
  })

  dragRef(dropRef(ref))

  return (
    <Container
      ref={ref}
      id={'folder_' + props.folder.id}
      isOver={isOver}
      isDragging={isDragging}
      className={props.className}
      onMouseDownCapture={props.onMouseDownCapture}
      onContextMenu={props.onContextMenu}
      onDoubleClick={props.onDoubleClick}>
      {props.folder.favorite && <FavoriteLabel children={<TbHeart />} />}
      <FaFolder size={20} color={props.folder.color || undefined} />
      {props.folder.folderName}
    </Container>
  )
}

export { Folder }
