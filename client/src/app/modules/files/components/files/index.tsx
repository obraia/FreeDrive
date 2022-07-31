import React, { useCallback, useRef } from 'react'
import { TbArrowUp } from 'react-icons/tb'
import { useDrag } from 'react-dnd'
import { ContextItemsKey, useFileSectionController } from './controller'
import { Rename } from '../rename'
import { ItemTypes } from '../dragLayer'
import { File } from './file'
import { Body, Container, Header, SortButton, Title } from './styles'
import { Loading } from '../../../shared/components/layout/loading'
import { useInfinityScroll } from '../../../shared/hooks/useInfinityScroll'

export interface FilesSectionProps {
  parentId?: string
  favorite?: boolean
  deleted?: boolean
  limit: number
  page: number
  contextMenuItems: ContextItemsKey[]
}

const FilesSection: React.FC<FilesSectionProps> = (props) => {
  const loadingRef = useRef<HTMLDivElement>(null)
  const observer = useRef<IntersectionObserver>()

  const {
    files,
    isFileSelected,
    handleSelectFile,
    handleContextMenu,
    toggleRename,
    rename,
    handleRename,
    nextPage,
    loading,
    hasMore,
  } = useFileSectionController(props)

  useDrag({
    type: ItemTypes.FILE,
    item: {
      type: ItemTypes.FILE,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const lastFileElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          nextPage()
        }
      })

      if (node) observer.current.observe(node)
    },
    [loading, hasMore],
  )

  const { limit, page, handleScroll } = useInfinityScroll({
    initialLimit: 40,
    loadingRef,
  })

  const renderFiles = () => {
    return files.map((file, index) => (
      <File
        key={file.id}
        file={file}
        ref={index === files.length - 1 ? lastFileElementRef : null}
        className={isFileSelected(file) ? 'selected' : ''}
        onMouseDownCapture={(e) => handleSelectFile(e, index)}
        onContextMenu={(e) => handleContextMenu(e, index)}
      />
    ))
  }

  const renderRename = () => {
    if (!rename?.visible || !rename.file) return null

    const parts = rename.file.originalName.split('.')
    const extension = parts.pop()
    const name = parts.join('.')

    return (
      <Rename
        title="Renomear arquivo"
        initialValue={rename.file?.originalName}
        selectionRange={[0, name.length]}
        onClose={toggleRename}
        onRename={handleRename}
      />
    )
  }

  return files.length ? (
    <Container>
      <Header>
        <Title>Arquivos</Title>
        <SortButton onClick={nextPage}>
          Nome
          <TbArrowUp size={20} />
        </SortButton>
      </Header>
      <Body>{renderFiles()}</Body>
      <Loading ref={loadingRef} loading={loading} />
      {renderRename()}
    </Container>
  ) : null
}

export { FilesSection }
