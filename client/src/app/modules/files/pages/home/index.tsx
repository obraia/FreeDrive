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
import { RootState } from '../../../../../infrastructure/redux/store'
import { useSelector } from 'react-redux'

const HomePage: React.FC = () => {
  const containerId = 'home-page'
  const uploaderId = 'home-page-uploader'

  const {
    user: { id: userId, driveFolder },
  } = useSelector((state: RootState) => state.profile)

  const { id: parentId = driveFolder.id } = useParams()

  const {
    newFolderModalVisible,
    toggleNewFolderModal,
    handleNewFolder,
    handleContextMenu,
  } = useHomePageController({ parentId, userId, containerId, uploaderId })

  const { limit, page, handleScroll } = useInfinityScroll({
    initialLimit: 40,
  })

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
            key={'folders'}
            deleted={false}
            parentId={parentId}
            contextMenuItems={['FAVORITE', 'DOWNLOAD', 'INFO', 'RENAME', 'TRASH']}
          />
          <FilesSection
            key={'files'}
            deleted={false}
            parentId={parentId}
            limit={limit}
            page={page}
            contextMenuItems={['FAVORITE', 'DOWNLOAD', 'INFO', 'RENAME', 'TRASH']}
          />
          {renderNewFolder()}
          <input id={uploaderId} title="files" type="file" />
          {/* <Loading /> */}
        </Container>
      </DndProvider>
    </Selection>
  )
}

export { HomePage }
