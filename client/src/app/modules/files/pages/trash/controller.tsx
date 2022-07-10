import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { TbFile, TbFolder, TbFolderPlus, TbInfoCircle } from 'react-icons/tb'
import { FileService } from '../../../../../infrastructure/services/file/file.service'
import { FolderService } from '../../../../../infrastructure/services/folder/folder.service'
import {
  addFiles,
  addFolders,
  clearAllSelections,
} from '../../reducers/files.reducer'

import {
  hideMenu,
  showMenu,
} from '../../../../../infrastructure/redux/reducers/contextmenu'
import { setPage } from '../../../../../infrastructure/redux/reducers/pages'
import { getSequencePaths } from '../../../shared/utils/formatters/paths.formatter'

interface Props {
  userId: string
  parentId: string
  containerId: string
}

function useTrashPageController(props: Props) {
  const [newFolderModalVisible, setNewFolderModalVisible] = useState(false)

  const dispatch = useDispatch()

  const fileService = new FileService()
  const folderService = new FolderService()

  const contextItems = () => {
    return [
      {
        id: 1,
        name: 'Esvaziar lixeira',
        icon: TbFolder,
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.stopPropagation()
          hideContextMenu()
          callUpload('Folder')
        },
      },
      {
        id: 2,
        name: 'Obter informações',
        icon: TbInfoCircle,
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.stopPropagation()
          hideContextMenu()
        },
      },
    ]
  }

  const toggleNewFolderModal = () => {
    setNewFolderModalVisible((value) => !value)
  }

  const hideContextMenu = () => {
    dispatch(hideMenu())
  }

  const clearSelection = () => {
    dispatch(clearAllSelections())
  }

  const showContextMenu = (p: any) => {
    dispatch(showMenu(p))
  }

  const callUpload = (type: 'File' | 'Folder') => {
    const uploader = document.getElementById('uploader')

    if (!uploader) return

    if (type === 'File') {
      uploader.setAttribute('name', 'file[]')
      uploader.setAttribute('multiple', '')
    } else {
      uploader.removeAttribute('multiple')
    }

    if (type === 'Folder') {
      uploader.setAttribute('name', 'file')
      uploader.setAttribute('webkitdirectory', '')
      uploader.setAttribute('directory', '')
    } else {
      uploader.removeAttribute('webkitdirectory')
      uploader.removeAttribute('directory')
    }

    uploader.click()
  }

  const handleUpload = async (e: Event) => {
    const files = (e.target as HTMLInputElement).files

    if (!files) return

    const formData = new FormData()

    formData.append('userId', props.userId)
    formData.append('parentId', props.parentId)

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }

    fileService.uploadStatic(formData).then((data) => {
      dispatch(addFiles(data))
    })
  }

  const handleNewFolder = (folderName: string) => {
    const formData = new FormData()
    formData.append('folderName', folderName)
    formData.append('parentId', props.parentId)
    formData.append('userId', props.userId)

    folderService.createFolder(formData).then((data) => {
      dispatch(addFolders([data]))
    })

    toggleNewFolderModal()
  }

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()

    clearSelection()

    showContextMenu({
      items: contextItems(),
      xPos: e.pageX,
      yPos: e.pageY,
    })
  }

  const bindEvents = () => {
    const container = document.getElementById(props.containerId)
    const uploader = document.getElementById('uploader')
    container?.addEventListener('mousedown', clearSelection)
    uploader?.addEventListener('change', handleUpload)
  }

  const unbindEvents = () => {
    const container = document.getElementById(props.containerId)
    const uploader = document.getElementById('uploader')
    container?.removeEventListener('mousedown', clearSelection)
    uploader?.removeEventListener('change', handleUpload)
  }

  useEffect(() => {
    dispatch(
      setPage({
        title: 'Lixeira - Free Drive',
        current: '/trash',
        pathSequence: [{ id: '1', name: 'Lixeira' }],
      }),
    )

    bindEvents()

    return () => {
      unbindEvents()
      dispatch(clearAllSelections())
    }
  }, [])

  return {
    newFolderModalVisible,
    toggleNewFolderModal,
    handleNewFolder,
    handleContextMenu,
    handleUpload,
    contextItems,
    showContextMenu,
    hideContextMenu,
    callUpload,
  }
}

export { useTrashPageController }
