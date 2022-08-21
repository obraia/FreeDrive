import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { TbFile, TbFolder, TbFolderPlus, TbInfoCircle } from 'react-icons/tb'
import { useFolderService } from '../../../../../infrastructure/services/folder/folder.service'
import { getSequencePaths } from '../../../shared/utils/formatters/paths.formatter'
import { useFileService } from '../../../../../infrastructure/services/file/file.service'
import { setPage } from '../../../../../infrastructure/redux/reducers/pages'

import {
  addFiles,
  addFolders,
  clearAllSelections,
  clearFiles,
} from '../../reducers/files.reducer'

import {
  hideMenu,
  showMenu,
} from '../../../../../infrastructure/redux/reducers/contextmenu'

interface Props {
  parentId: string
  containerId: string
  uploaderId: string
}

function useHomePageController(props: Props) {
  const [newFolderModalVisible, setNewFolderModalVisible] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadingQuantity, setUploadingQuantity] = useState(0)

  const dispatch = useDispatch()
  const { uploadFiles } = useFileService()
  const { createFolder, getFolderById } = useFolderService()

  const contextItems = () => {
    return [
      {
        id: 1,
        name: 'Nova pasta',
        icon: TbFolderPlus,
        onClick: () => {
          hideContextMenu()
          toggleNewFolderModal()
        },
      },
      {
        id: 2,
        name: 'Fazer upload de arquivos',
        icon: TbFile,
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.stopPropagation()
          hideContextMenu()
          callUpload('File')
        },
      },
      {
        id: 3,
        name: 'Fazer upload de pasta',
        icon: TbFolder,
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.stopPropagation()
          hideContextMenu()
          callUpload('Folder')
        },
      },
      {
        id: 4,
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
    const uploader = document.getElementById(props.uploaderId)

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
    setUploading(true)

    const files = (e.target as HTMLInputElement).files

    if (!files) return

    setUploadingQuantity(files.length)

    const formData = new FormData()

    formData.append('parentId', props.parentId)

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }

    uploadFiles(formData)
      .then((data) => {
        dispatch(addFiles(data.slice(0, 40)))
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setUploading(false)
        setUploadingQuantity(0)
      })
  }

  const handleNewFolder = (folderName: string) => {
    const formData = new FormData()
    formData.append('folderName', folderName)
    formData.append('parentId', props.parentId)

    createFolder(formData).then((data) => {
      dispatch(addFolders([data]))
    })

    toggleNewFolderModal()
  }

  const handleContextMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
    const uploader = document.getElementById(props.uploaderId)
    container?.addEventListener('mousedown', clearSelection)
    uploader?.addEventListener('change', handleUpload)
  }

  const unbindEvents = () => {
    const container = document.getElementById(props.containerId)
    const uploader = document.getElementById(props.uploaderId)
    container?.removeEventListener('mousedown', clearSelection)
    uploader?.removeEventListener('change', handleUpload)
  }

  useEffect(() => {
    getFolderById(props.parentId).then((folder) => {
      dispatch(
        setPage({
          title: folder?.folderName + ' - Free Drive',
          current: '/drive',
          pathSequence: getSequencePaths(folder),
        }),
      )
    })

    bindEvents()

    return () => {
      unbindEvents()
      dispatch(clearAllSelections())
      dispatch(clearFiles())
    }
  }, [props.parentId])

  return {
    newFolderModalVisible,
    toggleNewFolderModal,
    handleNewFolder,
    handleContextMenu,
    handleUpload,
    uploading,
    uploadingQuantity,
    contextItems,
    showContextMenu,
    hideContextMenu,
    callUpload,
  }
}

export { useHomePageController }
