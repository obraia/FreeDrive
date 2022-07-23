import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { TbFolder, TbInfoCircle } from 'react-icons/tb'
import { clearAllSelections } from '../../reducers/files.reducer'

import {
  hideMenu,
  showMenu,
} from '../../../../../infrastructure/redux/reducers/contextmenu'
import { setPage } from '../../../../../infrastructure/redux/reducers/pages'

interface Props {
  userId: string
  containerId: string
}

function useTrashPageController(props: Props) {
  const [newFolderModalVisible, setNewFolderModalVisible] = useState(false)

  const dispatch = useDispatch()

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

  const handleContextMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()

    clearSelection()

    showContextMenu({
      items: contextItems(),
      xPos: e.pageX,
      yPos: e.pageY,
    })
  }

  useEffect(() => {
    dispatch(
      setPage({
        title: 'Lixeira - Free Drive',
        current: '/trash',
        pathSequence: [{ id: '1', name: 'Lixeira' }],
      }),
    )

    return () => {
      dispatch(clearAllSelections())
    }
  }, [])

  return {
    newFolderModalVisible,
    toggleNewFolderModal,
    handleContextMenu,
    contextItems,
    showContextMenu,
    hideContextMenu,
    callUpload,
  }
}

export { useTrashPageController }
