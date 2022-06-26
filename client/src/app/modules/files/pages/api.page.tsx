import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearAllSelections } from '../reducers/files.reducer';
import { Selection } from '../../shared/components/layout_components/selection';
import { Files } from '../components/files/files.component';
import { Folders } from '../components/folders/folders.component';
import { Container } from '../styles/home.style';
import { setPage } from '../../../../infrastructure/redux/reducers/pages';

/** mocks **/
import filesMock from '../../../../infrastructure/assets/mocks/files.json';
import foldersMock from '../../../../infrastructure/assets/mocks/folders.json';

const ApiPage: React.FC = () => {
  const dispatch = useDispatch();

  const clearSelection = () => {
    dispatch(clearAllSelections());
  };

  const getFiles = () => {
    return filesMock;
  };

  const getFolders = () => {
    return foldersMock;
  };

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
        title: 'API - FreeDrive',
        headerTitle: 'API',
      })
    );

    const container = document.getElementById('api-page');
    container?.addEventListener('click', clearSelection);

    return () => {
      container?.removeEventListener('click', clearSelection);
      clearSelection();
    };
  }, []);

  return (
    <Selection>
      <Container id='api-page'>{renderContent()}</Container>
    </Selection>
  );
};

export { ApiPage };