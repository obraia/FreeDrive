import React from 'react'
import { TbArrowUp } from 'react-icons/tb'
import { Body, Container, Header, SortButton, Title } from './styles'
import { Rename } from '../rename'
import { Folder } from './folder'
import { useFolderSectionController } from './controller'
import { ContextItemsKey } from '../files/controller'

interface Props {
  parentId?: string
  favorite?: boolean
  deleted?: boolean
  contextMenuItems: ContextItemsKey[]
}

const FoldersSection: React.FC<Props> = (props) => {
  const {
    folders,
    goToFolder,
    handleContextMenu,
    handleMove,
    handleRename,
    handleSelectFolder,
    isFolderSelected,
    rename,
    toggleRename,
  } = useFolderSectionController({
    parentId: props.parentId,
    deleted: props.deleted,
    favorite: props.favorite,
    contextMenuItems: props.contextMenuItems,
  })

  const renderFolders = () => {
    return folders.map((folder, index) => (
      <Folder
        key={folder.id}
        folder={folder}
        className={isFolderSelected(folder) ? 'selected' : ''}
        onMouseDownCapture={(e) => handleSelectFolder(e, index)}
        onContextMenu={(e) => handleContextMenu(e, index)}
        onDoubleClick={() => goToFolder(folder)}
        onDrag={handleMove}
      />
    ))
  }

  const renderRename = () => {
    return (
      rename?.visible && (
        <Rename
          title="Renomear pasta"
          initialValue={rename.folder?.folderName}
          onClose={toggleRename}
          onRename={handleRename}
        />
      )
    )
  }

  return folders.length ? (
    <Container>
      <Header>
        <Title>Pastas</Title>
        <SortButton>
          Nome
          <TbArrowUp size={20} />
        </SortButton>
      </Header>

      <Body>{renderFolders()}</Body>

      {renderRename()}
    </Container>
  ) : null
}

export { FoldersSection }
