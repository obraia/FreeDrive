import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../infrastructure/redux/store'
import { selectFiles, selectFolders } from '../../reducers/files.reducer'
import { SelectionController } from './controller'

export interface Props {
  children: React.ReactNode
  containerId: string
  onFilesSelectionChange?: (ids: number[]) => void
  onFoldersSelectionChange?: (ids: number[]) => void
}

const Selection: React.FC<Props> = (props) => {
  const { theme } = useSelector((state: RootState) => state.theme)
  const { files, folders } = useSelector((state: RootState) => state.files)
  const dispatch = useDispatch()

  const handleSelectFiles = (ids: string[]) => {
    dispatch(selectFiles({ ids }))
  }

  const handleSelectFolders = (ids: string[]) => {
    dispatch(selectFolders({ ids }))
  }

  useEffect(() => {
    if (!props.containerId) return

    const container = document.getElementById(props.containerId)

    if (!container) return

    const files = Array.from(container.querySelectorAll(`[id^="file_"]`))
    const folders = Array.from(container.querySelectorAll(`[id^="folder_"]`))

    if (!files || !folders) return

    const controller = new SelectionController({
      container,
      files,
      folders,
      mode: 'LOOSE',
      color: theme.colors.primary,
      onFilesSelectionChange: handleSelectFiles,
      onFoldersSelectionChange: handleSelectFolders,
    })

    return () => {
      controller.destroy()
    }
  }, [props.containerId, files, folders])

  return <Fragment>{props.children}</Fragment>
}

export { Selection }
