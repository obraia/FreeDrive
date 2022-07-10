import React from 'react'
import { TbArrowUp } from 'react-icons/tb'
import { useDrag } from 'react-dnd'
import { Rename } from '../rename'

import { Body, Container, Header, SortButton, Title } from './styles'
import { File } from './file'
import { ItemTypes } from '../dragLayer'
import { ContextItemsKey, useFileSectionController } from './controller'

export interface FilesSectionProps {
  parentId?: string
  favorite?: boolean
  deleted?: boolean
  limit: number
  page: number
  contextMenuItems: ContextItemsKey[]
}

const FilesSection: React.FC<FilesSectionProps> = (props) => {
  const {
    files,
    isFileSelected,
    handleSelectFile,
    handleContextMenu,
    toggleRename,
    rename,
    handleRename,
  } = useFileSectionController(props)

  console.log('[Render] FilesSection')

  useDrag({
    type: ItemTypes.FILE,
    item: {
      type: ItemTypes.FILE,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const renderFiles = () => {
    return files.map((file, index) => (
      <File
        key={file._id}
        file={file}
        className={isFileSelected(file) ? 'selected' : ''}
        onMouseDownCapture={(e) => handleSelectFile(e, index)}
        onContextMenu={(e) => handleContextMenu(e, index)}
      />
    ))
  }

  const renderRename = () => {
    return (
      rename?.visible && (
        <Rename
          title="Renomear arquivo"
          initialValue={rename.file?.originalName}
          onClose={toggleRename}
          onRename={handleRename}
        />
      )
    )
  }

  return files.length ? (
    <Container>
      <Header>
        <Title>Arquivos</Title>
        <SortButton>
          Nome
          <TbArrowUp size={20} />
        </SortButton>
      </Header>

      <Body>{renderFiles()}</Body>

      {renderRename()}
    </Container>
  ) : null
}

export { FilesSection }
