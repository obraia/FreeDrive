import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearAllSelections } from '../reducers/files.reducer';
import { Selection } from '../components/selection';
import { Files } from '../components/files/files.component';
import { Folders } from '../components/folders/folders.component';
import { Container } from '../styles/home.style';
import { setPage } from '../../../../infrastructure/redux/reducers/pages';

/** mocks **/
import filesMock from '../../../../infrastructure/assets/mocks/files.json';
import foldersMock from '../../../../infrastructure/assets/mocks/folders.json';
import { FilesService } from '../../../../infrastructure/services/files/files.service';
import { getSequencePaths } from '../../shared/utils/formatters/paths.formatter';
import { useLocation, useParams } from 'react-router-dom';
import { FolderService } from '../../../../infrastructure/services/folders/folders.service';

const FavoritesPage: React.FC = () => {
  const [Content, setContent] = useState<ReactNode>(null);
  const dispatch = useDispatch();
  const pathname = useParams()['*'] || '';

  const filesService = new FilesService();
  const folderService = new FolderService();

  const clearSelection = () => {
    dispatch(clearAllSelections());
  };

  const getCurrentFolder = async (path: string) => {
    return await folderService.getFolderById(path);
  };

  const getFiles = async (parentId: string) => {
    return await filesService.getFiles({ parentId });
  };

  const getFolders = async (parentId: string) => {
    return await folderService.getFolders({ parentId });
  };

  //!!! TODO: implementar useMemo
  const renderContent = async (path: string) => {
    const files = await getFiles(path);
    const folders = await getFolders(path);

    const hasFiles = files.length > 0;
    const hasFolders = folders.length > 0;

    const content =
      hasFiles || hasFolders ? (
        <>
          {hasFolders && <Folders folders={folders} />}
          {hasFiles && <Files files={files} />}
        </>
      ) : (
        <div />
      );

    setContent(content);
  };

  useEffect(() => {
    getCurrentFolder(pathname).then((folder) => {
      dispatch(
        setPage({
          title: (folder?.folderName || 'Favoritos') + ' - FreeDrive',
          pathSequence: getSequencePaths(folder),
        })
      );
    });

    renderContent(pathname);

    const container = document.getElementById('favorites-page');
    container?.addEventListener('mousedown', clearSelection);

    return () => {
      container?.removeEventListener('mousedown', clearSelection);
      clearSelection();
    };
  }, [pathname]);

  return (
    <Selection>
      <Container id='favorites-page'>{Content}</Container>
    </Selection>
  );
};

export { FavoritesPage };
