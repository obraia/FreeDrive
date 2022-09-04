import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import { IconType } from 'react-icons'
import { BiChevronRight, BiSelectMultiple } from 'react-icons/bi'
import { RootState } from '../../../../../infrastructure/redux/store'
import { Row } from '../../../shared/components/layout/row'
import { Container, Separator, TopbarButton } from './styles'

export interface TopbarItem {
  id: number
  name: string
  icon: IconType
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Topbar: React.FC = () => {
  const [isShowTooltip, setIsShowTooltip] = useState(true)

  const { selectedFiles, selectedFolders, contextMenuItems } = useSelector(
    (state: RootState) => state.files,
  )

  const { pathSequence, current: currentPage } = useSelector(
    (state: RootState) => state.pages,
  )

  const navigate = useNavigate()

  const renderTotalSelected = () => {
    const total = selectedFiles.length + selectedFolders.length

    if (total > 0) {
      return (
        <>
          <Separator />
          <TopbarButton>
            {selectedFiles.length + selectedFolders.length}
            <BiSelectMultiple size={18} />
          </TopbarButton>
        </>
      )
    }
  }

  const renderItems = () => {
    const hasSelectedFiles = Boolean(selectedFiles.length || selectedFolders.length)

    if (!hasSelectedFiles) return

    const isSingleSelection = selectedFiles.length + selectedFolders.length === 1

    return contextMenuItems
      .filter((i) => isSingleSelection || !i.single)
      .map((i) => (
        <TopbarButton
          key={i.id}
          onClick={i.onClick}
          data-tip
          data-for={i.id.toString()}
          onMouseEnter={() => setIsShowTooltip(true)}
          onMouseLeave={() => {
            setIsShowTooltip(false)
            setTimeout(() => setIsShowTooltip(true))
          }}>
          {<i.icon size={18} />}
          {isShowTooltip && (
            <ReactTooltip id={i.id.toString()} effect="solid" clickable>
              <span>{i.name}</span>
            </ReactTooltip>
          )}
        </TopbarButton>
      ))
  }

  const renderPath = () => {
    if (!pathSequence.length) return

    return pathSequence.map((p, i) => (
      <Fragment key={p._id}>
        <TopbarButton onClick={() => p._id ? navigate(`${currentPage}/${p._id}`) : {}}>
          {p.name}
        </TopbarButton>
        {i !== pathSequence.length - 1 && <BiChevronRight />}
      </Fragment>
    ))
  }

  return (
    <Container>
      <Row>{renderPath()}</Row>
      <Row>
        {renderItems()}
        {renderTotalSelected()}
      </Row>
    </Container>
  )
}

export { Topbar }
