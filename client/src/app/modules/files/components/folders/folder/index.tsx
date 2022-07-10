import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { FaFolder } from 'react-icons/fa'
import { TbHeart } from 'react-icons/tb'
import { IFolderChild } from '../../../../../../infrastructure/services/folder/interfaces'
import { ItemTypes } from '../../dragLayer'
import { Container, FavoriteLabel } from './styles'

interface Props {
  folder: IFolderChild
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
      id: props.folder._id,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ isOver }, dropRef] = useDrop({
    accept: [ItemTypes.FILE, ItemTypes.FOLDER],
    drop(item: { type: string; id: string }) {
      if (props.onDrag && item.type === ItemTypes.FILE) {
        // props.onDrag([item.id], props.folder._id, 'File');
      } else if (
        props.onDrag &&
        item.type === ItemTypes.FOLDER &&
        item.id !== props.folder._id
      ) {
        // props.onDrag([item.id], props.folder._id, 'Folder');
      }
    },
    collect(monitor) {
      return {
        isOver: monitor.isOver() && monitor.getItem().id !== props.folder._id,
      }
    },
  })

  dragRef(dropRef(ref))

  return (
    <Container
      ref={ref}
      id={'folder_' + props.folder._id}
      isOver={isOver}
      isDragging={isDragging}
      className={props.className}
      onMouseDownCapture={props.onMouseDownCapture}
      onContextMenu={props.onContextMenu}
      onDoubleClick={props.onDoubleClick}
    >
      {props.folder.favorite && <FavoriteLabel children={<TbHeart />} />}
      <FaFolder size={20} color={props.folder.color || undefined} />
      {props.folder.folderName}
    </Container>
  )
}

export { Folder }
