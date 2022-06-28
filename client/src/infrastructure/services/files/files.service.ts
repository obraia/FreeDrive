import axios, { AxiosInstance } from 'axios';
import { FileChild } from '../folders/folders.type';
import { GetFilesResponse } from './files.type';

export interface Disk {
  total: number;
  used: number;
}

interface Params {
  parentId: string;
  isFavorite?: boolean;
  isDeleted?: boolean;
}

class FilesService {
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

  public async getFiles(params: Params): Promise<GetFilesResponse[]> {
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

  public async getFile(path: string): Promise<GetFilesResponse> {
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

  public async uploadFiles(formData: FormData): Promise<FileChild[]> {
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
}

export { FilesService };
