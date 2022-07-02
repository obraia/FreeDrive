import { FilterQuery, Model, HydratedDocument, MergeType, RequireOnlyTypedId } from 'mongoose';

class BaseRepository<T> {
  [x: string]: any;

  constructor(protected model: Model<T>) {}

  createDocument(data: Omit<T, '_id'> | Omit<T, '_id'>[]) {
    return new this.model(data);
  }

  findOne(params: FilterQuery<T>) {
    return this.model.findOne(params).exec();
  }

  findAll(params: FilterQuery<T>) {
    return this.model.find(params).exec();
  }

  findById(id: string, populate?: string[]) {
    return populate ? this.model.findById(id).populate(populate) : this.model.findById(id);
  }

  create(data: Omit<T, '_id'> | Omit<T, '_id'>[]) {
    return this.model.create(data);
  }

  update(id: string, data: T) {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }

  deleteOne(params: FilterQuery<T>) {
    return this.model.deleteOne(params).exec();
  }

  deleteMany(ids: string[]) {
    return this.model.deleteMany({ _id: { $in: ids } }).exec();
  }

  createMany(data: T[]) {
    return this.model.insertMany(data);
  }
}

export { BaseRepository };
