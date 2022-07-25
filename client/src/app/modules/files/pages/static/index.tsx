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
import { ReplaceFiles } from '../../components/files/replace'

interface Props {
  parentId?: string
}

const StaticPage: React.FC<Props> = (props) => {
  const containerId = 'static-page'
  const uploaderId = 'home-page-uploader'

  const { id: parentId = props.parentId || '' } = useParams()

  const {
    newFolderModalVisible,
    toggleNewFolderModal,
    handleNewFolder,
    handleContextMenu,
    handleReplace,
    clearReplaceFiles,
    replaceFiles,
  } = useStaticPageController({ parentId, containerId, uploaderId })

  const renderNewFolder = () => {
    return (
      newFolderModalVisible && (
        <NewFolder onClose={toggleNewFolderModal} onCreate={handleNewFolder} />
      )
    )
  }

  const renderReplaceFile = () => {
    return (
      Boolean(replaceFiles.length) && (
        <ReplaceFiles
          files={replaceFiles as File[]}
          onClose={clearReplaceFiles}
          onReplace={handleReplace}
        />
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
          {renderReplaceFile()}
          <input id={uploaderId} title="files" type="file" />
        </Container>
      </DndProvider>
    </Selection>
  )
}

export { StaticPage }
