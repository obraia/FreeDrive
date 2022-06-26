import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../infrastructure/redux/store';
import { clearAllSelections } from '../reducers/files.reducer';
import { Selection } from '../../shared/components/layout_components/selection';
import { Files } from '../components/files/files.component';
import { Folders } from '../components/folders/folders.component';
import { Container } from '../styles/home.style';
import { setPage } from '../../../../infrastructure/redux/reducers/pages';

/** mocks **/
import filesMock from '../../../../infrastructure/assets/mocks/files.json';
import foldersMock from '../../../../infrastructure/assets/mocks/folders.json';

const TrashPage: React.FC = () => {
  const { selectedFiles, selectedFolders } = useSelector((state: RootState) => state.files);
  const dispatch = useDispatch();

  const clearSelection = () => {
    if (selectedFiles.length + selectedFolders.length > 0) {
      dispatch(clearAllSelections());
    }
  };

  const getFiles = () => {
    return filesMock.filter((f) => f.isDeleted);
  };

  const getFolders = () => {
    return foldersMock.filter((f) => f.isDeleted);
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
        title: 'Lixeira - FreeDrive',
        headerTitle: 'Lixeira',
      })
    );

    const container = document.getElementById('trash-page');
    container?.addEventListener('click', clearSelection);

    return () => {
      container?.removeEventListener('click', clearSelection);
      clearSelection();
    };
  }, []);

  return (
    <Selection>
      <Container id='trash-page'>{renderContent()}</Container>
    </Selection>
  );
};

export { TrashPage };
