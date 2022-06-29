import { FilterQuery, Model, HydratedDocument, MergeType, RequireOnlyTypedId } from 'mongoose';

class BaseRepository<T> {
  [x: string]: any;

  constructor(protected model: Model<T>) {}

  findOne(params: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(params).exec();
  }

  findAll(params: FilterQuery<T>): Promise<T[]> {
    return this.model.find(params).exec();
  }

  findById(id: string) {
    return this.model.findById(id).exec();
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

  createMany(data: T[]): Promise<HydratedDocument<MergeType<MergeType<T, T>, RequireOnlyTypedId<T>>, {}, {}>[]> {
    return this.model.insertMany(data);
  }
}

export { BaseRepository };
