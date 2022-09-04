import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Selection } from '../../components/selection'
import { FilesSection } from '../../components/files'
import { useSearchPageController } from './controller'
import { Container } from './styles'

interface Props {
  parentId?: string
}

const SearchPage: React.FC<Props> = (props) => {
  const containerId = 'static-page'

  const { id: parentId = props.parentId || '' } = useParams()
  const [searchParams] = useSearchParams()

  useSearchPageController({ 
    parentId,
    containerId,
  })

  return (
    <Selection containerId={containerId}>
      <DndProvider backend={HTML5Backend}>
        <Container id={containerId}>
          <FilesSection
            deleted={false}
            parentId={parentId}
            originalName={searchParams.get('q') || ''}
            contextMenuItems={['LINK', 'DOWNLOAD', 'INFO', 'RENAME', 'TRASH']}
          />
        </Container>
      </DndProvider>
    </Selection>
  )
}

export { SearchPage }
