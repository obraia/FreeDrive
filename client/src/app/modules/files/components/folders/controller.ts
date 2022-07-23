import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdDriveFileMoveOutline, MdRestore } from 'react-icons/md'

import {
  TbCopy,
  TbDownload,
  TbHeart,
  TbHeartBroken,
  TbInfoCircle,
  TbPencil,
  TbTrash,
} from 'react-icons/tb'

import {
  hideMenu,
  showMenu,
} from '../../../../../infrastructure/redux/reducers/contextmenu'

import { RootState } from '../../../../../infrastructure/redux/store'

import {
  clearFolders,
  selectFolders,
  setContextMenuItems,
  setFolders,
} from '../../reducers/files.reducer'

import { ContextMenuItem } from '../../../shared/components/layout/contextmenu'
import { FolderService } from '../../../../../infrastructure/services/folder/folder.service'
import { IFolderChild } from '../../../../../infrastructure/services/folder/interfaces'
import { useNavigate } from 'react-router-dom'

const contextMenuItemsIds = {
  COPY: 'COPY',
  DOWNLOAD: 'DOWNLOAD',
  RENAME: 'RENAME',
  TRASH: 'TRASH',
  DELETE: 'DELETE',
  FAVORITE: 'FAVORITE',
  LINK: 'LINK',
  RESTORE: 'RESTORE',
  MOVE: 'MOVE',
  INFO: 'INFO',
} as const

type ContextItemsKey = typeof contextMenuItemsIds[keyof typeof contextMenuItemsIds]

interface Props {
  parentId?: string
  deleted?: boolean
  favorite?: boolean
  contextMenuItems: ContextItemsKey[]
}

interface Raname {
  visible: boolean
  folder: IFolderChild | null
}

function useFolderSectionController(props: Props) {
  const [rename, setRename] = useState<Raname>({ visible: false, folder: null })

  const { selectedFolders, folders } = useSelector((state: RootState) => state.files)
  const { current: currentPage } = useSelector((state: RootState) => state.pages)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const service = new FolderService()

  const contextMenuItems = (folder: Partial<IFolderChild>) => [
    {
      id: contextMenuItemsIds.MOVE,
      name: 'Mover para',
      icon: MdDriveFileMoveOutline,
      single: true,
      onClick: () => {},
    },
    {
      id: contextMenuItemsIds.COPY,
      name: 'Copiar para',
      icon: TbCopy,
      single: true,
      onClick: () => {},
    },
    {
      id: contextMenuItemsIds.RENAME,
      name: 'Renomear',
      icon: TbPencil,
      single: true,
      onClick: toggleRename,
    },
    {
      id: contextMenuItemsIds.FAVORITE,
      name: folder.favorite ? 'Desfavoritar' : 'Favoritar',
      icon: folder.favorite ? TbHeartBroken : TbHeart,
      single: false,
      onClick: () => handleFavorite(!Boolean(folder.favorite)),
    },
    {
      id: contextMenuItemsIds.DOWNLOAD,
      name: 'Fazer download',
      icon: TbDownload,
      single: false,
      onClick: handleDownload,
    },
    {
      id: contextMenuItemsIds.TRASH,
      name: 'Mover para lixeira',
      icon: TbTrash,
      single: false,
      onClick: handleTrash,
    },
    {
      id: contextMenuItemsIds.INFO,
      name: 'Informações',
      icon: TbInfoCircle,
      single: true,
      onClick: () => {},
    },
    {
      id: contextMenuItemsIds.RESTORE,
      name: 'Restaurar',
      icon: MdRestore,
      single: false,
      onClick: () => {},
    },
    {
      id: contextMenuItemsIds.DELETE,
      name: 'Excluir permanentemente',
      icon: TbTrash,
      single: false,
      onClick: handleDelete,
    },
  ]

  const getContextMenuItems = (): ContextMenuItem[] => {
    const selection = folders.filter((f) => selectedFolders.includes(f._id))

    const hasFavorite =
      selection.every((f) => f.favorite) ||
      (folders[0].favorite && folders.length === 1)

    const isSingle = selection.length === 1

    const contextItems = contextMenuItems({
      favorite: hasFavorite,
    })

    return contextItems.filter(
      (item) =>
        props.contextMenuItems.includes(item.id) && (isSingle ? true : !item.single),
    )
  }

  const handleFavorite = (favorite: boolean) => {
    if (!selectedFolders.length) return

    service.favorite(selectedFolders, favorite).then((res) => {
      const newFolders = folders.map((f) =>
        selectedFolders.includes(f._id) ? { ...f, favorite } : f,
      )

      dispatch(setFolders(newFolders))
    })

    dispatch(hideMenu())
  }

  const handleDownload = () => {
    if (!selectedFolders.length) return

    const folderToDownload = (res: any) => {
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', res.originalName)
      document.body.appendChild(link)
      link.click()
      link.remove()
    }

    service.download(selectedFolders).then((res) => {
      folderToDownload(res)
    })

    dispatch(hideMenu())
  }

  const handleTrash = () => {
    if (!selectedFolders.length) return

    service.moveToTrash(selectedFolders).then(() => {
      const newFiles = folders.filter((f) => !selectedFolders.includes(f._id))
      dispatch(setFolders(newFiles))
    })

    dispatch(hideMenu())
  }

  const handleDelete = () => {
    if (!selectedFolders.length) return

    service.delete(selectedFolders).then(() => {
      const newFolders = folders.filter((f) => !selectedFolders.includes(f._id))
      dispatch(setFolders(newFolders))
    })

    dispatch(hideMenu())
  }

  const handleRename = (originalName: string) => {
    const { folder } = rename

    if (!folder) return

    service.rename(folder._id, originalName).then(() => {
      const newFolders = folders.map((f) =>
        f._id === folder._id ? { ...f, originalName } : f,
      )

      dispatch(setFolders(newFolders))
    })
  }

  const handleContextMenu = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number,
  ) => {
    e.stopPropagation()
    e.preventDefault()
    handleSelectFolder(e, index)
    dispatch(
      showMenu({ items: getContextMenuItems(), xPos: e.pageX, yPos: e.pageY }),
    )
  }

  const handleSelectFolder = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number,
  ) => {
    e.stopPropagation()
    const folder = folders[index]

    if (
      e.buttons === 2 &&
      selectedFolders.length >= 1 &&
      selectedFolders.includes(folder._id)
    ) {
      return
    }

    dispatch(hideMenu())

    let foldersIds = [] as string[]

    if (e.metaKey && selectedFolders.length > 0) {
      if (selectedFolders.includes(folder._id)) {
        foldersIds = selectedFolders.filter((i) => i !== folder._id)
      } else {
        foldersIds = [folder._id, ...selectedFolders]
      }
    } else if (e.shiftKey && selectedFolders.length > 0) {
      const firstSelected = selectedFolders[0]
      const firstIndex = folders.findIndex((f) => f._id === firstSelected)
      const first = Math.min(firstIndex, index)
      const last = Math.max(firstIndex, index)

      foldersIds = folders
        .filter((_, i) => i >= first && i <= last)
        .map((f) => f._id)
    } else {
      foldersIds = [folder._id]
    }

    dispatch(selectFolders({ ids: foldersIds }))
  }

  const handleMove = async (parentId: string) => {
    service.move(selectedFolders, parentId).then((res) => {
      const newFolders = folders.filter((f) => !selectedFolders.includes(f._id))
      dispatch(setFolders(newFolders))
    })
  }

  const toggleRename = () => {
    if (rename?.visible) {
      setRename({ visible: false, folder: null })
    } else {
      dispatch(hideMenu())
      const folder = folders.find((f) => selectedFolders.includes(f._id))

      if (folder) {
        setRename({ visible: true, folder })
      }
    }
  }

  const goToFolder = (folder: IFolderChild) => {
    navigate(`${currentPage}/${folder._id}`)
  }

  const isFolderSelected = (f: IFolderChild) => selectedFolders.includes(f._id)

  useEffect(() => {
    service
      .getFolders({
        parentId: props.parentId,
        deleted: props.deleted,
        favorite: props.favorite,
      })
      .then((data) => {
        if (data.length) {
          dispatch(setFolders(data))
        }
      })
      .catch((err) => {
        console.error(err)
      })

    return () => {
      dispatch(clearFolders())
    }
  }, [props.parentId])

  useEffect(() => {
    if (selectedFolders.length > 0) {
      dispatch(setContextMenuItems({ items: getContextMenuItems() }))
    }
  }, [selectedFolders, folders])

  return {
    folders,
    handleContextMenu,
    handleSelectFolder,
    handleMove,
    selectedFolders,
    isFolderSelected,
    handleRename,
    toggleRename,
    rename,
    goToFolder,
  }
}

export { useFolderSectionController }
