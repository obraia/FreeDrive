/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Selection } from '../../components/selection'
import { useFavoritesPageController } from './controller'
import { FilesSection } from '../../components/files'
import { FoldersSection } from '../../components/folders'
import { Container } from './styles'

const FavoritesPage: React.FC = () => {
  const containerId = 'favorites-page'

  useFavoritesPageController({ containerId })

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
