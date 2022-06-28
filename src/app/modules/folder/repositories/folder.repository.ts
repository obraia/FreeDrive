import { PrismaClient, Prisma, Folder } from '@prisma/client';
import { CreateFolder, FolderHistory } from './folder.type';

class FolderRepository {
  private _model: Prisma.FolderDelegate<any>;

  constructor() {
    const prisma = new PrismaClient();
    this._model = prisma.folder;
  }

  async find(params: Prisma.FolderWhereInput) {
    return await this._model.findMany({
      where: params,
    });
  }

  async findById(id: string) {
    return await this._model.findUnique({
      where: { id },
      include: {
        children: {
          select: {
            id: true,
            folderName: true,
            color: true,
            favorite: true,
            deleted: true,
          },
        },
        files: {
          select: {
            id: true,
            fileName: true,
            originalName: true,
            mimetype: true,
            favorite: true,
            deleted: true,
          },
        },
        parent: {
          select: {
            id: true,
            folderName: true,
          },
        },
      },
    });
  }

  async findHistory(id: string, history: FolderHistory[] = []): Promise<FolderHistory[] | undefined> {
    const folder = await this._model.findUnique({
      where: { id },
      include: {
        parent: {
          select: {
            id: true,
            folderName: true,
          },
        },
      },
    });

    if (folder?.parent) {
      history.push(folder.parent);
      return await this.findHistory(folder.parent.id, history);
    } else {
      return history;
    }
  }

  async create(data: CreateFolder) {
    return await this._model.create({ data });
  }

  async update(id: string, data: Folder) {
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
}

export { FolderRepository };
