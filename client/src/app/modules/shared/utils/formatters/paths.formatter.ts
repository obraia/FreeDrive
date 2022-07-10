import { IFolder } from '../../../../../infrastructure/services/folder/interfaces'

interface PathSequence {
  id: string
  name: string
}

const getSequencePaths = (folder: IFolder): PathSequence[] => {
  const sequence: PathSequence[] = []

  for (const h of folder.parents.sort((a, b) => a.depth - b.depth).reverse()) {
    sequence.push({
      id: h._id,
      name: h.folderName,
    })
  }

  sequence.push({
    id: folder._id,
    name: folder.folderName,
  })

  return sequence
}

export { getSequencePaths }
export type { PathSequence }
