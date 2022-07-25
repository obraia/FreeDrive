import { useAxios } from '../../../app/modules/shared/hooks/useAxios'

import {
  IGetFoldersParams,
  IGetFoldersResponse,
  IGetFolderByIdResponse,
  ICreateFolderResponse,
  IDownloadFolderResponse,
  IDeleteResponse,
  IFavoriteResponse,
  IMoveResponse,
  IMoveToTrashResponse,
  IRenameResponse,
} from './folder.service.d'

export interface Disk {
  total: number
  used: number
}

const useFolderService = () => {
  const axios = useAxios()

  const getFolders = async (params: IGetFoldersParams) => {
    const { data } = await axios.get<IGetFoldersResponse>('/folders', { params })
    return data
  }

  const getFolderById = async (id: string, params?: IGetFoldersParams) => {
    const { data } = await axios.get<IGetFolderByIdResponse>(`/folders/deep/${id}`, {
      params,
    })
    return data
  }

  const createFolder = async (formData: FormData) => {
    const { data } = await axios.post<ICreateFolderResponse>('/folders', formData)
    return data
  }

  const uploadFolders = async (formData: FormData) => {
    const { data } = await axios.post<IGetFoldersResponse>('/folders', formData)
    return data
  }

  const downloadFolders = async (ids: string[]) => {
    const { data, headers } = await axios.get<IDownloadFolderResponse>(
      `/folders/download`,
      {
        params: { ids },
        responseType: 'blob',
      },
    )

    return { data, originalName: headers['file-name'] }
  }

  const favoriteFolders = async (ids: string[], favorite: boolean) => {
    const { data } = await axios.patch<IFavoriteResponse>('/folders/favorite', {
      ids,
      favorite,
    })
    return data
  }

  const moveFoldersToTrash = async (ids: string[]) => {
    const { data } = await axios.patch<IMoveToTrashResponse>('/folders/trash', {
      ids,
    })
    return data
  }

  const renameFolder = async (id: string, folderName: string) => {
    const { data } = await axios.patch<IRenameResponse>(`/folders/rename/${id}`, {
      folderName,
    })
    return data
  }

  const moveFolders = async (ids: string[], parentId: string) => {
    const { data } = await axios.patch<IMoveResponse>('/folders/move', {
      ids,
      parentId,
    })
    return data
  }

  const deleteFolders = async (ids: string[]) => {
    const { data } = await axios.delete<IDeleteResponse>('/folders', {
      params: { ids },
    })
    return data
  }

  const getDiskSpace = async () => {
    const { data } = await axios.get<Disk>('/disk')
    return data
  }

  return {
    getFolders,
    getFolderById,
    createFolder,
    uploadFolders,
    downloadFolders,
    favoriteFolders,
    moveFoldersToTrash,
    renameFolder,
    moveFolders,
    deleteFolders,
    getDiskSpace,
  }
}

export { useFolderService }
