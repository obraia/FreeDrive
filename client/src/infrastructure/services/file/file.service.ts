import axios, { AxiosInstance } from 'axios';
import { IFileChild } from '../folder/interfaces';

export interface Disk {
  total: number;
  used: number;
}

interface Params {
  parentId: string;
  isFavorite?: boolean;
  isDeleted?: boolean;
}

class FileService {
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

  public async getFiles(params: Params): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.api
        .get(`/files`, { params })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public async getFile(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api
        .get(`/files/${path}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public async uploadFiles(formData: FormData): Promise<IFileChild[]> {
    return new Promise((resolve, reject) => {
      this.api
        .post(`/files/`, formData)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public async downloadById(id: string): Promise<{ data: any; originalName: string }> {
    return new Promise((resolve, reject) => {
      this.api
        .get(`/files/download/${id}`, { responseType: 'blob' })
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

  public async downloadMany(ids: string[]): Promise<{ data: any; originalName: string }> {
    return new Promise((resolve, reject) => {
      this.api
        .get(`/files/download`, { params: { ids }, responseType: 'blob' })
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
        .patch(`/files/favorite`, { ids, favorite })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public async moveToTrash(ids: string[]): Promise<{ acknowledged: Boolean; deletedCount: number }> {
    return new Promise((resolve, reject) => {
      this.api
        .patch(`/files/move-to-trash`, { ids })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public async deleteFiles(ids: string[]): Promise<{
    acknowledged: Boolean;
    matchedCount: number;
    modifiedCount: number;
  }> {
    return new Promise((resolve, reject) => {
      this.api
        .delete(`/files/`, { params: { ids } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export { FileService };
