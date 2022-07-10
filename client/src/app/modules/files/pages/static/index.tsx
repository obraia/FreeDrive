import React from 'react'
import { useParams } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Selection } from '../../components/selection'
import { FilesSection } from '../../components/files'
import { FoldersSection } from '../../components/folders'
import { NewFolder } from '../../components/folders/new'
import { useStaticPageController } from './controller'
import { Container } from './styles'

const StaticPage: React.FC = () => {
  const containerId = 'static-page'
  const uploaderId = 'home-page-uploader'
  const userId = '62ba0237ca20daae241e8737'
  const { id: parentId = '62c8c139b15f09e152aeeee2' } = useParams()

  const {
    newFolderModalVisible,
    toggleNewFolderModal,
    handleNewFolder,
    handleContextMenu,
  } = useStaticPageController({ parentId, userId, containerId, uploaderId })

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
          <FoldersSection
            deleted={false}
            parentId={parentId}
            contextMenuItems={['DOWNLOAD', 'INFO', 'RENAME', 'TRASH']}
          />
          <FilesSection
            deleted={false}
            parentId={parentId}
            limit={30}
            page={1}
            contextMenuItems={['LINK', 'DOWNLOAD', 'INFO', 'RENAME', 'TRASH']}
          />
          {renderNewFolder()}
          <input id={uploaderId} title="files" type="file" />
        </Container>
      </DndProvider>
    </Selection>
  )
}

export { StaticPage }
