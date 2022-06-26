import React, { useEffect } from 'react';
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

const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch();

  const clearSelection = () => {
    dispatch(clearAllSelections());
  };

  const getFiles = () => {
    return filesMock.filter((f) => !f.isDeleted && f.isFavorite);
  };

  const getFolders = () => {
    return foldersMock.filter((f) => !f.isDeleted && f.isFavorite);
  };

  //!!! TODO: implementar useMemo
  const renderContent = () => {
    const files = getFiles();
    const folders = getFolders();

    const hasFiles = files.length > 0;
    const hasFolders = folders.length > 0;

    return hasFiles || hasFolders ? (
      <>
        {hasFolders && <Folders folders={folders} />}
        {hasFiles && <Files files={files} />}
      </>
    ) : (
      <div />
    );
  };

  useEffect(() => {
    dispatch(
      setPage({
        title: 'Favoritos - FreeDrive',
        headerTitle: 'Favoritos',
      })
    );

    const container = document.getElementById('favorites-page');
    container?.addEventListener('mousedown', clearSelection);

    return () => {
      container?.removeEventListener('mousedown', clearSelection);
      clearSelection();
    };
  }, []);

  return (
    <Selection>
      <Container id='favorites-page'>{renderContent()}</Container>
    </Selection>
  );
};

export { FavoritesPage };
