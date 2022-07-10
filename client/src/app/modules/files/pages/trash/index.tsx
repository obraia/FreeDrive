import React from 'react'
import { useParams } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Selection } from '../../components/selection'
import { FilesSection } from '../../components/files'
import { FoldersSection } from '../../components/folders'
import { NewFolder } from '../../components/folders/new'
import { useTrashPageController } from './controller'
import { Container } from './styles'

const TrashPage: React.FC = () => {
  const containerId = 'trash-page'
  const userId = '62ba0237ca20daae241e8737'
  const { id: parentId = '62c8c139b15f09e152aeeee2' } = useParams()

  const {
    newFolderModalVisible,
    toggleNewFolderModal,
    handleNewFolder,
    handleContextMenu,
  } = useTrashPageController({ parentId, userId, containerId })

  const renderNewFolder = () => {
    return (
      newFolderModalVisible && (
        <NewFolder onClose={toggleNewFolderModal} onCreate={handleNewFolder} />
      )
    )
  }

  return (
    <Selection containerId={containerId}>
      <DndProvider backend={HTML5Backend}>
        <Container id={containerId} onContextMenu={handleContextMenu}>
          <FoldersSection deleted contextMenuItems={['RESTORE', 'DELETE', 'INFO']} />
          <FilesSection
            deleted
            limit={10}
            page={1}
            contextMenuItems={['RESTORE', 'DELETE', 'INFO']}
          />
          {renderNewFolder()}
          <input id="uploader" title="files" type="file" />
        </Container>
      </DndProvider>
    </Selection>
  )
}

export { TrashPage }
