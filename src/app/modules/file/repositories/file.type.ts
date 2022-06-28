import { Prisma } from '@prisma/client';

type CreateFile = Prisma.Without<Prisma.FileCreateInput, Prisma.FileUncheckedCreateInput> &
  Prisma.FileUncheckedCreateInput;

export { CreateFile };
