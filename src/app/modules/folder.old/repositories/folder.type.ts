import { Prisma } from '@prisma/client';

type CreateFolder = Prisma.Without<Prisma.FolderCreateInput, Prisma.FolderUncheckedCreateInput> &
  Prisma.FolderUncheckedCreateInput;

interface FolderHistory {
  id: string;
  folderName: string;
}

export { CreateFolder, FolderHistory };
