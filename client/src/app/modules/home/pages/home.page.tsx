import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TbFile, TbFolder, TbFolderPlus } from 'react-icons/tb';
import { RootState } from '../../../../infrastructure/redux/store';
import { clearAllSelections } from '../reducers/home.reducer';
import { hideMenu, showMenu } from '../../../../infrastructure/redux/reducers/context_menu';
import { Selection } from '../../shared/components/layout_components/selection';
import { Files } from '../components/files/files.component';
import { Folders } from '../components/folders/folders.component';
import { Container } from '../styles/home.style';

const HomePage: React.FC = () => {
  const { selectedFiles, selectedFolders } = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch();

  const inputFile = useRef<HTMLInputElement>(null);

  const contextMenuItems = [
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
  ];

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(showMenu({ items: contextMenuItems, xPos: e.pageX, yPos: e.pageY }));
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
    if (selectedFiles.length + selectedFolders.length > 0) {
      dispatch(clearAllSelections());
    }
  };

  useEffect(() => {
    document.title = 'Início - FreeDrive';

    const home = document.getElementById('home');

    home?.addEventListener('click', clearSelection);

    return () => {
      home?.removeEventListener('click', clearSelection);
    };
  });

  return (
    <Selection>
      <Container onContextMenu={handleContextMenu} id='home'>
        <Folders />
        <Files />
        <input title='files' type='file' id='file' ref={inputFile} />
      </Container>
    </Selection>
  );
};

export { HomePage };
