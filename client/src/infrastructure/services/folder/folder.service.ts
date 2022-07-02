import axios, { AxiosInstance } from 'axios';
import { IFolder, IFolderChild } from './interfaces';

export interface Disk {
  total: number;
  used: number;
}

interface GetParams {
  favorite?: boolean;
  deleted?: boolean;
}

class FolderService {
  private api: AxiosInstance;
  private url: string;

  constructor() {
    this.url = 'http://localhost:3003/api';

    this.api = axios.create({
      baseURL: this.url,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async getFolderById(id: string, params?: GetParams): Promise<IFolder> {
    return new Promise((resolve, reject) => {
      this.api
        .get(`/folders/deep/${id}`, { params })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public async uploadFolders(formData: FormData): Promise<IFolderChild[]> {
    return new Promise((resolve, reject) => {
      this.api
        .post(`/folders/`, formData)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public async download(ids: string[]): Promise<{ data: any; originalName: string }> {
    return new Promise((resolve, reject) => {
      this.api
        .get(`/folders/download`, { params: { ids }, responseType: 'blob' })
        .then((response) => {
          resolve({
            data: response.data,
            originalName: response.headers['file-name'],
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public async favorite(ids: string[], favorite: boolean): Promise<{ acknowledged: Boolean }> {
    return new Promise((resolve, reject) => {
      this.api
        .patch(`/folders/favorite`, { ids, favorite })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public async moveToTrash(ids: string[]): Promise<{ acknowledged: Boolean }> {
    return new Promise((resolve, reject) => {
      this.api
        .patch(`/folders/move-to-trash`, { ids })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public async deletefolders(ids: string[]): Promise<{
    acknowledged: Boolean;
    matchedCount: number;
    modifiedCount: number;
  }> {
    return new Promise((resolve, reject) => {
      this.api
        .delete(`/folders/`, { params: { ids } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public async getDiskSpace(): Promise<Disk> {
    return new Promise((resolve, reject) => {
      this.api
        .get(`/disk`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export { FolderService };