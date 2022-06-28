import { PrismaClient, Prisma, User } from '@prisma/client';

class UserRepository {
  private _model: Prisma.UserDelegate<any>;

  constructor() {
    const prisma = new PrismaClient();
    this._model = prisma.user;
  }

  async findById(id: string) {
    return await this._model.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return await this._model.create({ data });
  }

  async update(id: string, data: User) {
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

export { UserRepository };
