import { PrismaClient, Prisma, File } from '@prisma/client';
import { CreateFile } from './file.type';

class FileRepository {
  private _model: Prisma.FileDelegate<any>;

  constructor() {
    const prisma = new PrismaClient();
    this._model = prisma.file;
  }

  async find(params: Prisma.FileWhereInput) {
    return await this._model.findMany({
      where: params,
    });
  }

  async findById(id: string) {
    return await this._model.findUnique({
      where: { id },
    });
  }

  async create(data: CreateFile) {
    return await this._model.create({ data });
  }

  async update(id: string, data: File) {
    return await this._model.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await this._model.delete({
      where: { id },
    });
  }

  async deleteAll(parentId: string) {
    return await this._model.deleteMany({
      where: { parentId },
    });
  }

  async move(id: string, parentId: string) {
    return await this._model.update({
      where: { id },
      data: { parentId },
    });
  }

  async copy(file: File, parentId: string) {
    return await this._model.create({
      data: {
        ...file,
        parentId,
        id: undefined,
      },
    });
  }

  async createMany(data: Prisma.Enumerable<Prisma.FileCreateManyInput>) {
    return await this._model.createMany({ data });
  }
}

export { FileRepository };
