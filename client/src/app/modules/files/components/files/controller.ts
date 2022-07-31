import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdDriveFileMoveOutline, MdLink, MdRestore } from 'react-icons/md'

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

import {
  addFiles,
  clearFiles,
  selectFiles,
  setContextMenuItems,
  setFiles,
} from '../../reducers/files.reducer'

import { RootState } from '../../../../../infrastructure/redux/store'
import { ContextMenuItem } from '../../../shared/components/layout/contextmenu'
import { useFileService } from '../../../../../infrastructure/services/file/file.service'
import { IFile } from '../../../../../infrastructure/services/file/file.service.d'
import { FilesSectionProps } from '.'

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

interface Raname {
  visible: boolean
  file: IFile | null
}

const useFileSectionController = (props: FilesSectionProps) => {
  const [rename, setRename] = useState<Raname>({ visible: false, file: null })
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const { selectedFiles, files } = useSelector((state: RootState) => state.files)
  const dispatch = useDispatch()

  const {
    downloadFiles,
    favoriteFiles,
    downloadFile,
    moveToTrash,
    deleteFiles,
    renameFile,
    getFiles,
  } = useFileService()

  const contextMenuItems = (file: { favorite: boolean }) => [
    {
      id: contextMenuItemsIds.LINK,
      name: 'Copiar link',
      icon: MdLink,
      single: true,
      onClick: handleCopyToClipboard,
    },
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
      name: file.favorite ? 'Desfavoritar' : 'Favoritar',
      icon: file.favorite ? TbHeartBroken : TbHeart,
      single: false,
      onClick: () => handleFavorite(!Boolean(file.favorite)),
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
    const selection = files.filter((f) => selectedFiles.includes(f.id))

    const hasFavorite =
      selection.every((f) => f.favorite) || (files[0].favorite && files.length === 1)

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
    if (!selectedFiles.length) return

    favoriteFiles(selectedFiles, favorite).then(() => {
      const newFiles = files
        .map((f) => (selectedFiles.includes(f.id) ? { ...f, favorite } : f))
        .filter((f) => (props.favorite ? f.favorite : true))

      dispatch(setFiles(newFiles))
    })

    dispatch(hideMenu())
  }

  const handleDownload = () => {
    if (!selectedFiles.length) return

    const fileToDownload = (res: any) => {
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', res.originalName)
      document.body.appendChild(link)
      link.click()
      link.remove()
    }

    if (selectedFiles.length > 1) {
      downloadFiles(selectedFiles).then((res) => {
        fileToDownload(res)
      })
    } else {
      downloadFile(selectedFiles[0]).then((res) => {
        fileToDownload(res)
      })
    }

    dispatch(hideMenu())
  }

  const handleTrash = () => {
    if (!selectedFiles.length) return

    moveToTrash(selectedFiles).then(() => {
      const newFiles = files.filter((f) => !selectedFiles.includes(f.id))
      dispatch(setFiles(newFiles))
    })

    dispatch(hideMenu())
  }

  const handleDelete = () => {
    if (!selectedFiles.length) return

    deleteFiles(selectedFiles).then(() => {
      const newFiles = files.filter((f) => !selectedFiles.includes(f.id))
      dispatch(setFiles(newFiles))
    })

    dispatch(hideMenu())
  }

  const handleRename = (originalName: string) => {
    const { file } = rename

    if (!file) return

    renameFile(file.id, originalName).then(() => {
      const newFiles = files.map((f) =>
        f.id === file.id ? { ...f, originalName } : f,
      )

      dispatch(setFiles(newFiles))
    })
  }

  const handleContextMenu = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number,
  ) => {
    e.stopPropagation()
    e.preventDefault()
    handleSelectFile(e, index)
    dispatch(
      showMenu({ items: getContextMenuItems(), xPos: e.pageX, yPos: e.pageY }),
    )
  }

  const handleSelectFile = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number,
  ) => {
    e.stopPropagation()
    const file = files[index]

    if (
      e.buttons === 2 &&
      selectedFiles.length >= 1 &&
      selectedFiles.includes(file.id)
    ) {
      return
    }

    dispatch(hideMenu())

    let filesIds = [] as string[]

    if (e.metaKey && selectedFiles.length > 0) {
      if (selectedFiles.includes(file.id)) {
        filesIds = selectedFiles.filter((i) => i !== file.id)
      } else {
        filesIds = [file.id, ...selectedFiles]
      }
    } else if (e.shiftKey && selectedFiles.length > 0) {
      const firstSelected = selectedFiles[0]
      const firstIndex = files.findIndex((f) => f.id === firstSelected)
      const first = Math.min(firstIndex, index)
      const last = Math.max(firstIndex, index)

      filesIds = files.filter((_, i) => i >= first && i <= last).map((f) => f.id)
    } else {
      filesIds = [file.id]
    }

    dispatch(selectFiles({ ids: filesIds }))
  }

  const handleCopyToClipboard = () => {
    if (!selectedFiles.length) return

    const [id] = selectedFiles

    const file = files.find((f) => f.id === id)

    navigator.clipboard.writeText(
      `http://localhost:3003/api/static/files/${id}?mimetype=${file?.mimetype}`,
    )

    dispatch(hideMenu())
  }

  const toggleRename = () => {
    if (rename?.visible) {
      setRename({ visible: false, file: null })
    } else {
      dispatch(hideMenu())
      const file = files.find((f) => selectedFiles.includes(f.id))

      if (file) {
        setRename({ visible: true, file })
      }
    }
  }

  const isFileSelected = (f: IFile) => selectedFiles.includes(f.id)

  const nextPage = () => {
    setPage((p) => p + 1)
  }

  useEffect(() => {
    setLoading(true)

    getFiles({
      parentId: props.parentId,
      deleted: props.deleted,
      favorite: props.favorite,
      limit: 30,
      page: page,
    })
      .then((data) => {
        if (data.length) {
          dispatch(addFiles(data))
        } else {
          setHasMore(false)
        }
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [props.parentId, page])

  useEffect(() => {
    if (selectedFiles.length > 0) {
      dispatch(setContextMenuItems({ items: getContextMenuItems() }))
    }
  }, [selectedFiles, files])

  useEffect(() => {
    return () => {
      dispatch(clearFiles())
    }
  }, [])

  return {
    files,
    handleContextMenu,
    handleSelectFile,
    selectedFiles,
    isFileSelected,
    handleRename,
    toggleRename,
    rename,
    nextPage,
    loading,
    hasMore,
  }
}

export { useFileSectionController }
export type { ContextItemsKey }
