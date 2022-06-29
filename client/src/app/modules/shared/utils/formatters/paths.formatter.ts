import { CurrentFolder } from '../../../../../infrastructure/services/folders/folders.type';

interface PathSequence {
  id: string;
  name: string;
}

const getSequencePaths = (folder: CurrentFolder): PathSequence[] => {
  const sequence: PathSequence[] = [];

  for (const h of folder.parents.reverse()) {
    sequence.push({
      id: h._id,
      name: h.folderName,
    });
  }

  sequence.push({
    id: folder._id,
    name: folder.folderName,
  });

  return sequence;
};

export { getSequencePaths };
export type { PathSequence };
