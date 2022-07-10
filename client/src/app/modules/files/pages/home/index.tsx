import React from 'react'
import { useParams } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Selection } from '../../components/selection'
import { FilesSection } from '../../components/files'
import { FoldersSection } from '../../components/folders'
import { NewFolder } from '../../components/folders/new'
import { useHomePageController } from './controller'
import { Container } from './styles'
import { useInfinityScroll } from '../../../shared/hooks/useInfinityScroll'

const HomePage: React.FC = () => {
  const containerId = 'home-page'
  const uploaderId = 'home-page-uploader'
  const scrollControlId = 'home-page-scroll-control'
  const userId = '62ba0237ca20daae241e8737'
  const { id: parentId = '62bbc4d7edf858e4c6a9b98a' } = useParams()

  const {
    newFolderModalVisible,
    toggleNewFolderModal,
    handleNewFolder,
    handleContextMenu,
  } = useHomePageController({ parentId, userId, containerId, uploaderId })

  const { limit, page } = useInfinityScroll({
    controlId: 'home-page-scroll-control',
    initialLimit: 30,
  })

  const renderNewFolder = () => {
    return (
      newFolderModalVisible && (
        <NewFolder onClose={toggleNewFolderModal} onCreate={handleNewFolder} />
      )
    )
  }

  console.log({ limit, page })

  return (
    <Selection containerId={containerId}>
      <DndProvider backend={HTML5Backend}>
        <Container id={containerId} onContextMenu={handleContextMenu}>
          <FoldersSection
            deleted={false}
            parentId={parentId}
            contextMenuItems={['FAVORITE', 'DOWNLOAD', 'INFO', 'RENAME', 'TRASH']}
          />
          <FilesSection
            deleted={false}
            parentId={parentId}
            limit={limit}
            page={page}
            contextMenuItems={['FAVORITE', 'DOWNLOAD', 'INFO', 'RENAME', 'TRASH']}
          />
          {renderNewFolder()}
          <input id={uploaderId} title="files" type="file" />
          <div id={scrollControlId} />
        </Container>
      </DndProvider>
    </Selection>
  )
}

export { HomePage }
