import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TbFile, TbFolder, TbFolderPlus, TbInfoCircle } from 'react-icons/tb'
import { useFileService } from '../../../../../infrastructure/services/file/file.service'
import { useFolderService } from '../../../../../infrastructure/services/folder/folder.service'
import { getSequencePaths } from '../../../shared/utils/formatters/paths.formatter'
import { setPage } from '../../../../../infrastructure/redux/reducers/pages'

import {
  addFolders,
  clearAllSelections,
  clearFiles,
  setFiles,
} from '../../reducers/files.reducer'

import {
  hideMenu,
  showMenu,
} from '../../../../../infrastructure/redux/reducers/contextmenu'
import { RootState } from '../../../../../infrastructure/redux/store'

interface Props {
  parentId: string
  containerId: string
  uploaderId: string
}

function useStaticPageController(props: Props) {
  const [replaceFiles, setReplaceFiles] = useState<File[]>([])
  const [newFolderModalVisible, setNewFolderModalVisible] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadingQuantity, setUploadingQuantity] = useState(0)

  const dispatch = useDispatch()

  const { files } = useSelector((state: RootState) => state.files)

  const { uploadStaticFiles, getFiles } = useFileService()
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

    const { files: fileList } = e.target as HTMLInputElement

    if (!fileList) return

    setUploadingQuantity(fileList.length)

    const formData = new FormData()

    formData.append('parentId', props.parentId)
    formData.append('replace', 'true')

    for (let i = 0; i < fileList.length; i++) {
      formData.append('files', fileList[i])
      // setReplaceFiles((value) => [...value, files[i]])
    }

    try {
      await uploadStaticFiles(formData)
      const data = await getFiles({
        parentId: props.parentId,
        limit: files.length,
        page: 1,
        deleted: false,
        favorite: false,
      })

      dispatch(setFiles(data))
    } catch (error) {
      console.log(error)
    } finally {
      setUploading(false)
      setUploadingQuantity(0)
    }
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

  const handleReplace = (fileName: string) => {
    setReplaceFiles((files) => files.slice(1))
    console.log(fileName + ' substituido')
  }

  const clearReplaceFiles = () => {
    setReplaceFiles([])
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
          current: '/static',
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
    handleReplace,
    clearReplaceFiles,
    replaceFiles,
  }
}

export { useStaticPageController }
