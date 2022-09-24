import { FilterQuery, Model, UpdateQuery } from 'mongoose'

class BaseRepository<T> {
  [x: string]: any

  constructor(protected model: Model<T>) {}

  createDocument(data: T | T[]) {
    return new this.model(data)
  }

  findOne(params: FilterQuery<T>, projection?: string) {
    return this.model.findOne(params, projection).exec()
  }

  find(params: FilterQuery<T>, limit: number, page: number) {
    return this.model
      .find(params)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()
  }

  findAll(params: FilterQuery<T>) {
    return this.model.find(params).exec()
  }

  findById(id: string, options: { populate?: string[]; projection?: string[] }) {
    const result = this.model.findById(id)

    if (options.populate) {
      return result.populate(options.populate)
    }

    if (options.projection) {
      return result.select(options.projection)
    }

    return result.exec()
  }

  create(data: Omit<T, '_id'> | Omit<T, '_id'>[]) {
    return this.model.create(data)
  }

  update(id: string, data: UpdateQuery<T>) {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec()
  }

  delete(id: string) {
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
