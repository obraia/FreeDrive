import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TbFile, TbFolder, TbFolderPlus, TbInfoCircle } from 'react-icons/tb';
import { useParams } from 'react-router-dom';
import { clearAllSelections } from '../reducers/files.reducer';
import { hideMenu, showMenu } from '../../../../infrastructure/redux/reducers/contextmenu';
import { Selection } from '../components/selection';
import { Files } from '../components/files/files.component';
import { Folders } from '../components/folders/folders.component';
import { Container } from '../styles/home.style';
import { setPage } from '../../../../infrastructure/redux/reducers/pages';
import { getSequencePaths } from '../../shared/utils/formatters/paths.formatter';
import { FilesService } from '../../../../infrastructure/services/files/files.service';
import { FolderService } from '../../../../infrastructure/services/folders/folders.service';
import { FileChild, FolderChild } from '../../../../infrastructure/services/folders/folders.type';

const HomePage: React.FC = () => {
  const [files, setFiles] = useState<FileChild[]>([]);
  const [folders, setFolders] = useState<FolderChild[]>([]);

  const dispatch = useDispatch();
  const inputFile = useRef<HTMLInputElement>(null);

  const { id: folderId = '62ba0256ca20daae241e8739' } = useParams();
  const userId = '62ba0237ca20daae241e8737';

  const filesService = new FilesService();
  const foldersService = new FolderService();

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

  const handleFileChange = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;

    if (!files) return;

    const formData = new FormData();

    formData.append('userId', userId);
    formData.append('parentId', folderId);

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    filesService.uploadFiles(formData).then((res) => {
      setFiles((f) => [...f, ...res]);
    });
  };

  const clearSelection = () => {
    dispatch(clearAllSelections());
  };

  //!!! TODO: implementar useMemo
  const renderContent = () => {
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
    const uploader = inputFile.current;

    foldersService.getFolderById(folderId).then((folder) => {
      dispatch(
        setPage({
          title: (folder?.folderName || 'Início') + ' - FreeDrive',
          pathSequence: getSequencePaths(folder),
        })
      );

      setFiles(folder?.files || []);
      setFolders(folder?.children || []);
    });

    const container = document.getElementById('home-page');
    container?.addEventListener('mousedown', clearSelection);
    uploader?.addEventListener('change', handleFileChange);

    return () => {
      container?.removeEventListener('mousedown', clearSelection);
      uploader?.removeEventListener('change', handleFileChange);
      clearSelection();
    };
  }, [folderId]);

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
