import { Types } from "mongoose";

class MongoHelper {
  static getObjectId(id: string) {
    return new Types.ObjectId(id);
  }

  static isValidObjectId(id: string) {
    return Types.ObjectId.isValid(id);
  }

  static getObjectIdArray(ids: string[]) {
    return ids.map((id) => new Types.ObjectId(id));
  }

  static isValidObjectIdArray(ids: string[]) {
    return ids.every((id) => Types.ObjectId.isValid(id));
  }

  static getObjectIdArrayFromObjectIds(ids: Types.ObjectId[]) {
    return ids.map((id) => id.toHexString());
  }
}

export { MongoHelper };