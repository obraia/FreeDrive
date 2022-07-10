import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Selection } from '../../components/selection'
import { FilesSection } from '../../components/files'
import { FoldersSection } from '../../components/folders'
import { useFavoritesPageController } from './controller'
import { Container } from './styles'

const FavoritesPage: React.FC = () => {
  const containerId = 'favorites-page'
  const userId = '62ba0237ca20daae241e8737'

  useFavoritesPageController({ userId, containerId })

  console.log('[Render] FavoritesPage')

  return (
    <Selection containerId={containerId}>
      <DndProvider backend={HTML5Backend}>
        <Container id={containerId}>
          <FoldersSection
            favorite
            deleted={false}
            contextMenuItems={['FAVORITE', 'DOWNLOAD', 'INFO', 'RENAME', 'TRASH']}
          />
          <FilesSection
            favorite
            deleted={false}
            limit={10}
            page={1}
            contextMenuItems={['FAVORITE', 'DOWNLOAD', 'INFO', 'RENAME', 'TRASH']}
          />
        </Container>
      </DndProvider>
    </Selection>
  )
}

export { FavoritesPage }
