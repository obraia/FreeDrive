import { IFolderDeep } from '../../../../../infrastructure/services/folder/folder.service.d'

interface PathSequence {
  id: string
  name: string
}

const getSequencePaths = (folder: IFolderDeep): PathSequence[] => {
  const sequence: PathSequence[] = []

  if (folder.parents) {
    for (const f of folder.parents.sort((a, b) => a.depth - b.depth).reverse()) {
      sequence.push({
        id: f.id,
        name: f.folderName,
      })
    }
  }

  sequence.push({
    id: folder._id,
    name: folder.folderName,
  })

  return sequence
}

export { getSequencePaths }
export type { PathSequence }
