import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Selection } from '../../components/selection'
import { FilesSection } from '../../components/files'
import { FoldersSection } from '../../components/folders'
import { useTrashPageController } from './controller'
import { Container } from './styles'

const TrashPage: React.FC = () => {
  const containerId = 'trash-page'

  const { handleContextMenu } = useTrashPageController({ containerId })

  return (
    <Selection containerId={containerId}>
      <DndProvider backend={HTML5Backend}>
        <Container id={containerId} onContextMenu={handleContextMenu}>
          <FoldersSection deleted contextMenuItems={['RESTORE', 'DELETE', 'INFO']} />
          <FilesSection deleted contextMenuItems={['RESTORE', 'DELETE', 'INFO']} />
        </Container>
      </DndProvider>
    </Selection>
  )
}

export { TrashPage }
