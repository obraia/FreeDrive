import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { TbFile, TbFolder, TbFolderPlus, TbInfoCircle } from 'react-icons/tb';
import { clearAllSelections } from '../reducers/files.reducer';
import { hideMenu, showMenu } from '../../../../infrastructure/redux/reducers/contextmenu';
import { Selection } from '../components/selection';
import { Files } from '../components/files/files.component';
import { Folders } from '../components/folders/folders.component';
import { Container } from '../styles/home.style';
import { setPage } from '../../../../infrastructure/redux/reducers/pages';

/** mocks **/
import filesMock from '../../../../infrastructure/assets/mocks/files.json';
import foldersMock from '../../../../infrastructure/assets/mocks/folders.json';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const inputFile = useRef<HTMLInputElement>(null);

  const pageContextMenuItems = [
    {
      id: 1,
      name: 'Nova pasta',
      icon: TbFolderPlus,
      onClick: () => {},
    },
    {
      id: 2,
      name: 'Fazer upload de arquivos',
      icon: TbFile,
      onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        dispatch(hideMenu());
        handleUpload('Files');
      },
    },
    {
      id: 3,
      name: 'Fazer upload de pasta',
      icon: TbFolder,
      onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        dispatch(hideMenu());
        handleUpload('Folders');
      },
    },
    {
      id: 4,
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

  const handleUpload = (type: 'Files' | 'Folders') => {
    if (!inputFile.current) return;

    if (type === 'Files') {
      inputFile.current.setAttribute('name', 'file[]');
      inputFile.current.setAttribute('multiple', '');
    } else {
      inputFile.current.removeAttribute('multiple');
    }

    if (type === 'Folders') {
      inputFile.current.setAttribute('name', 'file');
      inputFile.current.setAttribute('webkitdirectory', '');
      inputFile.current.setAttribute('directory', '');
    } else {
      inputFile.current.removeAttribute('webkitdirectory');
      inputFile.current.removeAttribute('directory');
    }

    inputFile.current?.click();
  };

  const clearSelection = () => {
    dispatch(clearAllSelections());
  };

  const getFiles = () => {
    return filesMock.filter((f) => !f.isDeleted);
  };

  const getFolders = () => {
    return foldersMock.filter((f) => !f.isDeleted);
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
        title: 'Início - FreeDrive',
        headerTitle: 'Meu Drive',
      })
    );

    const container = document.getElementById('home-page');
    container?.addEventListener('mousedown', clearSelection);

    return () => {
      container?.removeEventListener('mousedown', clearSelection);
      clearSelection();
    };
  }, []);

  return (
    <Selection>
      <Container id='home-page' onContextMenu={handleContextMenu}>
        {renderContent()}
        <input title='files' type='file' ref={inputFile} />
      </Container>
    </Selection>
  );
};

export { HomePage };
