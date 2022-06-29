import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaFolder } from 'react-icons/fa';
import { TbArrowUp, TbDownload, TbHeart, TbHeartBroken, TbInfoCircle, TbLink, TbPencil, TbTrash } from 'react-icons/tb';
import { RootState } from '../../../../../infrastructure/redux/store';
import { selectFolders, setContextMenuItems } from '../../reducers/files.reducer';
import { showMenu } from '../../../../../infrastructure/redux/reducers/contextmenu';
import { Body, Container, Folder, Header, SortButton, Title } from './styles';
import { MdRestore } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { FolderChild } from '../../../../../infrastructure/services/folders/folders.type';

interface Props {
  folders: FolderChild[];
}

const Folders: React.FC<Props> = (props) => {
  const { selectedFolders } = useSelector((state: RootState) => state.files);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const regularContextMenuItems = (folder: FolderChild) => [
    {
      id: 1,
      name: 'Copiar link',
      icon: TbLink,
      single: true,
      onClick: () => {},
    },
    {
      id: 2,
      name: 'Renomear',
      icon: TbPencil,
      single: true,
      onClick: () => {},
    },
    {
      id: 3,
      name: folder.favorite ? 'Desfavoritar' : 'Favoritar',
      icon: folder.favorite ? TbHeartBroken : TbHeart,
      single: false,
      onClick: () => {},
    },
    {
      id: 4,
      name: 'Fazer download',
      icon: TbDownload,
      single: false,
      onClick: () => {},
    },
    {
      id: 5,
      name: 'Excluir',
      icon: TbTrash,
      single: false,
      onClick: () => {},
    },
    {
      id: 6,
      name: 'Informações',
      icon: TbInfoCircle,
      single: true,
      onClick: () => {},
    },
  ];

  const deletedContextMenuItems = () => [
    {
      id: 1,
      name: 'Restaurar',
      icon: MdRestore,
      single: false,
      onClick: () => {},
    },
    {
      id: 2,
      name: 'Excluir permanentemente',
      icon: TbTrash,
      single: false,
      onClick: () => {},
    },
    {
      id: 3,
      name: 'Informações',
      icon: TbInfoCircle,
      single: true,
      onClick: () => {},
    },
  ];

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    e.stopPropagation();
    e.preventDefault();

    handleSelectFolder(e, index);

    const folder = props.folders[index];

    const contextItems = folder.deleted ? deletedContextMenuItems() : regularContextMenuItems(folder);

    dispatch(showMenu({ items: contextItems, xPos: e.pageX, yPos: e.pageY }));
  };

  const handleSelectFolder = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    e.stopPropagation();

    const folder = props.folders[index];

    if (e.buttons === 2 && selectedFolders.length >= 1 && selectedFolders.includes(folder._id)) {
      return;
    }

    let foldersIds = [] as string[];

    if (e.metaKey && selectedFolders.length > 0) {
      if (selectedFolders.includes(folder._id)) {
        foldersIds = selectedFolders.filter((i) => i !== folder._id);
      } else {
        foldersIds = [...selectedFolders, folder._id];
      }
    } else if (e.shiftKey && selectedFolders.length > 0) {
      const firstSelected = selectedFolders[0];
      const firstIndex = props.folders.findIndex((f) => f._id === firstSelected);
      const first = Math.min(firstIndex, index);
      const last = Math.max(firstIndex, index);

      foldersIds = props.folders.filter((f, i) => i >= first && i <= last).map((f) => f._id);
    } else {
      foldersIds = [folder._id];
    }

    dispatch(selectFolders({ ids: foldersIds }));
  };

  const goToFolder = (folder: FolderChild) => {
    navigate(folder._id);
  };

  const renderFolders = () => {
    return props.folders.map((folder, index) => (
      <Folder
        key={folder._id}
        id={'folder_' + folder._id}
        selected={selectedFolders.includes(folder._id)}
        onClickCapture={(e) => handleSelectFolder(e, index)}
        onContextMenu={(e) => handleContextMenu(e, index)}
        onMouseDownCapture={(e) => e.stopPropagation()}
        onDoubleClick={() => goToFolder(folder)}
      >
        <FaFolder size={20} color={folder.color || undefined} />
        {folder.folderName}
      </Folder>
    ));
  };

  useEffect(() => {
    if (selectedFolders.length > 0) {
      const folder = props.folders.find((f) => f._id === selectedFolders[0]);

      if (folder) {
        const contextItems = folder.deleted ? deletedContextMenuItems() : regularContextMenuItems(folder);

        dispatch(setContextMenuItems({ items: contextItems }));
      }
    }
  }, [selectedFolders]);

  return (
    <Container>
      <Header>
        <Title>Pastas</Title>
        <SortButton>
          Nome
          <TbArrowUp size={20} />
        </SortButton>
      </Header>

      <Body>{renderFolders()}</Body>
    </Container>
  );
};

export { Folders };
