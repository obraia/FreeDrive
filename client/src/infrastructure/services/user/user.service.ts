import axios, { AxiosInstance } from 'axios'
import { IUser } from './interfaces'

export interface Disk {
  total: number
  used: number
}

interface Params {
  parentId?: string
  favorite?: boolean
  deleted?: boolean
}

class UserService {
  private api: AxiosInstance
  private url: string

  constructor() {
    this.url = 'http://localhost:3003/api'

    this.api = axios.create({
      baseURL: this.url,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  public async getUserById(id: string, params?: Params): Promise<IUser> {
    return new Promise((resolve, reject) => {
      this.api
        .get(`/users/${id}`, { params })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export { UserService }
