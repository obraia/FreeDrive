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
import { hideMenu, showMenu } from '../../../../infrastructure/redux/reducers/contextmenu';
import { TbInfoCircle, TbTrash } from 'react-icons/tb';
import { MdRestore } from 'react-icons/md';

const TrashPage: React.FC = () => {
  const dispatch = useDispatch();

  const pageContextMenuItems = [
    {
      id: 1,
      name: 'Esvaziar lixeira',
      icon: TbTrash,
      onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        dispatch(hideMenu());
      },
    },
    {
      id: 1,
      name: 'Restaurar tudo',
      icon: MdRestore,
      onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        dispatch(hideMenu());
      },
    },
    {
      id: 3,
      name: 'Obter informações',
      icon: TbInfoCircle,
      onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        dispatch(hideMenu());
      },
    },
  ];

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(showMenu({ items: pageContextMenuItems, xPos: e.pageX, yPos: e.pageY }));
  };

  const clearSelection = () => {
    dispatch(clearAllSelections());
  };

  const getFiles = () => {
    return filesMock.filter((f) => f.isDeleted);
  };

  const getFolders = () => {
    return foldersMock.filter((f) => f.isDeleted);
  };

  //!!! TODO: implementar useMemo
  const renderContent = () => {
    const files = getFiles();
    const folders = getFolders();

    const hasFiles = files.length > 0;
    const hasFolders = folders.length > 0;

    return hasFiles || hasFolders ? (
      <>
        {hasFolders && <Folders folders={folders as any} />}
        {hasFiles && <Files files={files as any} />}
      </>
    ) : (
      <div />
    );
  };

  useEffect(() => {
    dispatch(
      setPage({
        title: 'Lixeira - FreeDrive',
        pathSequence: [],
      })
    );

    const container = document.getElementById('trash-page');
    container?.addEventListener('mousedown', clearSelection);

    return () => {
      container?.removeEventListener('mousedown', clearSelection);
      clearSelection();
    };
  }, []);

  return (
    <Selection>
      <Container onContextMenu={handleContextMenu} id='trash-page'>
        {renderContent()}
      </Container>
    </Selection>
  );
};

export { TrashPage };
