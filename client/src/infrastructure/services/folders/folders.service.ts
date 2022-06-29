import axios, { AxiosInstance } from 'axios';
import { CurrentFolder, GetFoldersResponse } from './folders.type';

export interface Disk {
  total: number;
  used: number;
}

interface Params {
  parentId: string;
  isFavorite?: boolean;
  isDeleted?: boolean;
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

  public getFolders(params: Params): Promise<GetFoldersResponse[]> {
    return new Promise((resolve, reject) => {
      this.api
        .get(`/folders`, { params })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public async getFolderById(id: string): Promise<CurrentFolder> {
    return new Promise((resolve, reject) => {
      this.api
        .get(`/folders/deep/${id}`)
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
