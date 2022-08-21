import { IFolderDeep } from '../../../../../infrastructure/services/folder/folder.service.d'

interface PathSequence {
  _id: string
  name: string
}

const getSequencePaths = (folder: IFolderDeep): PathSequence[] => {
  const sequence: PathSequence[] = []

  if (folder.parents) {
    for (const f of folder.parents.sort((a, b) => a.depth - b.depth).reverse()) {
      sequence.push({
        _id: f._id,
        name: f.folderName,
      })
    }
  }

  sequence.push({
    _id: folder._id,
    name: folder.folderName,
  })

  return sequence
}

export { getSequencePaths }
export type { PathSequence }
