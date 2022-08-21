import React from 'react'
import { useParams } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useHomePageController } from './controller'
import { NewFolder } from '../../components/folders/new'
import { Selection } from '../../components/selection'
import { FilesSection } from '../../components/files'
import { FoldersSection } from '../../components/folders'
import { Uploading } from '../../components/uploading'
import { Container } from './styles'

interface Props {
  parentId?: string
}

const HomePage: React.FC<Props> = (props) => {
  const containerId = 'home-page'
  const uploaderId = 'home-page-uploader'

  const { id: parentId = props.parentId || '' } = useParams()

  const {
    uploading,
    uploadingQuantity,
    newFolderModalVisible,
    toggleNewFolderModal,
    handleNewFolder,
    handleContextMenu,
  } = useHomePageController({ parentId, containerId, uploaderId })

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
            contextMenuItems={['FAVORITE', 'DOWNLOAD', 'INFO', 'RENAME', 'TRASH']}
          />
          {renderNewFolder()}
          <input id={uploaderId} title="files" type="file" />
        </Container>
        <Uploading uploading={uploading} quantity={uploadingQuantity} />
      </DndProvider>
    </Selection>
  )
}

export { HomePage }
