import { useAxios } from '../../../app/modules/shared/hooks/useAxios'

import {
  IGetFilesParams,
  IGetFilesResponse,
  IUploadFileResponse,
  IDownloadFileResponse,
  IFavoriteResponse,
  IMoveToTrashResponse,
  IRenameResponse,
  IMoveResponse,
  IDeleteResponse,
} from './file.service.d'

export interface Disk {
  total: number
  used: number
}

const useFileService = () => {
  const axios = useAxios()

  const getFiles = async (params: IGetFilesParams) => {
    const { data } = await axios.get<IGetFilesResponse>('/files', { params })
    return data
  }

  const uploadFiles = async (formData: FormData) => {
    const { data } = await axios.post<IUploadFileResponse>('/files', formData)
    return data
  }

  const uploadStaticFiles = async (formData: FormData) => {
    const { data } = await axios.post<IUploadFileResponse>('/files/static', formData)
    return data
  }

  const downloadFile = async (id: string) => {
    const { data, headers } = await axios.get<IDownloadFileResponse>(
      `/files/download/${id}`,
      { responseType: 'blob' },
    )
    return { data, originalName: headers['file-name'] }
  }

  const downloadFiles = async (ids: string[]) => {
    const { data, headers } = await axios.get<IDownloadFileResponse>(
      `/files/download`,
      { params: { ids }, responseType: 'blob' },
    )
    return { data, originalName: headers['file-name'] }
  }

  const favoriteFiles = async (ids: string[], favorite: boolean) => {
    const { data } = await axios.patch<IFavoriteResponse>('/files/favorite', {
      ids,
      favorite,
    })
    return data
  }

  const moveToTrash = async (ids: string[]) => {
    const { data } = await axios.patch<IMoveToTrashResponse>('/files/trash', { ids })
    return data
  }

  const renameFile = async (id: string, originalName: string) => {
    const { data } = await axios.patch<IRenameResponse>(`/files/rename/${id}`, {
      originalName,
    })
    return data
  }

  const moveFiles = async (ids: string[], parentId: string) => {
    const { data } = await axios.patch<IMoveResponse>('/files/move', {
      ids,
      parentId,
    })
    return data
  }

  const deleteFiles = async (ids: string[]) => {
    const { data } = await axios.delete<IDeleteResponse>('/files', {
      params: { ids },
    })
    return data
  }

  return {
    getFiles,
    uploadFiles,
    uploadStaticFiles,
    downloadFile,
    downloadFiles,
    favoriteFiles,
    moveToTrash,
    renameFile,
    moveFiles,
    deleteFiles,
  }
}

export { useFileService }
