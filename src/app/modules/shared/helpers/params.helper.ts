import { Types } from "mongoose";


class Params {
  static string(value?: any): string | undefined {
    return value ? String(value) : undefined
  }

  static boolean(value?: any): boolean | undefined {
    return value
      ? typeof value === 'string'
        ? value === 'true'
        : Boolean(value)
      : undefined
  }

  static like(value?: any): { $regex: string; $options: string } | undefined {
    return value ? { $regex: value, $options: 'i' } : undefined
  }

  static number(value?: any, fallback?: number) {
    return value ? Number(value) : fallback
  }

  static arrayString(value?: any): string[] | undefined {
    if(value instanceof Array) {
      return value.map((v) => String(v))
    }
  }

  static arrayObjectId(value?: string[]): Types.ObjectId[] | undefined {
    if(value instanceof Array) {
      const ids = []

      for (const id of value) {
        if(Types.ObjectId.isValid(id)) {
          ids.push(new Types.ObjectId(id))
        }
      }

      return ids
    }
  }

  static pagination(limit: string, page: string) {
    return {
      limit: Number(limit),
      page: Number(page),
    }
  }
}

interface ParamsDTO {
  string(value: undefined): undefined
  string(value: any): string

  boolean(value: undefined): undefined
  boolean(value: any): boolean

  like(value: undefined): undefined
  like(value: any): { $regex: string; $options: string }

  number(value: undefined, fallback?: undefined): undefined
  number(value: any, fallback?: undefined): number
  number(value: undefined, fallback?: number): number
  number(value: any, fallback?: number): number
  
  arrayString(value: undefined): undefined
  arrayString(value: any): string[]

  pagination(limit: string, page: string): { limit: number; page: number }
}

// replace Params with ParamsDTO
const params = Params as ParamsDTO

export { params as Params }

