import { FilterQuery, Model, UpdateQuery } from 'mongoose'

interface IOptions {
  pagination?: { page: number; limit: number }
  populate?: string[]
  projection?: string[]
}

class BaseRepository<T> {
  constructor(protected model: Model<T>) {}

  createDocument(data: Partial<T> | Partial<T>[]) {
    return new this.model(data)
  }

  find(filter: FilterQuery<T>, options?: IOptions) {
    const result = this.model.find(filter)

    if (options?.pagination) {
      result
        .limit(options.pagination.limit)
        .skip((options.pagination.page - 1) * options.pagination.limit)
    }

    if (options?.populate) {
      result.populate(options.populate)
    }

    if (options?.projection) {
      result.select(options.projection)
    }

    return {
      data: result.exec(),
      total: this.model.countDocuments(filter).exec(),
    }
  }

  findOne(params: FilterQuery<T>, options?: IOptions) {
    const result = this.model.findOne(params)

    if (options?.populate) {
      result.populate(options.populate)
    }

    if (options?.projection) {
      result.select(options.projection)
    }

    return result.exec()
  }

  findById(id: string, options?: IOptions) {
    const result = this.model.findById(id)

    if (options?.populate) {
      result.populate(options.populate)
    }

    if (options?.projection) {
      result.select(options.projection)
    }

    return result.exec()
  }

  create(data: Omit<T, '_id'> | Omit<T, '_id'>[]) {
    return this.model.create(data)
  }

  updateById(id: string, data: UpdateQuery<T>) {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec()
  }

  updateMany(params: FilterQuery<T>, data: UpdateQuery<T>) {
    return this.model.updateMany(params, data)
  }

  deleteById(id: string) {
    return this.model.findByIdAndDelete(id).exec()
  }

  deleteOne(params: FilterQuery<T>) {
    return this.model.deleteOne(params).exec()
  }

  deleteMany(ids: string[]) {
    return this.model.deleteMany({ _id: { $in: ids } }).exec()
  }

  createMany(data: T[]) {
    return this.model.insertMany(data)
  }
}

export { BaseRepository }
