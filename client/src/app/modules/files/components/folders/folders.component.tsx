import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaFolder } from 'react-icons/fa';
import { TbArrowUp, TbDownload, TbHeart, TbInfoCircle, TbLink, TbPencil, TbTrash } from 'react-icons/tb';
import { RootState } from '../../../../../infrastructure/redux/store';
import { selectFolders } from '../../reducers/files.reducer';
import { showMenu } from '../../../../../infrastructure/redux/reducers/contextmenu';
import { Body, Container, Folder, Header, SortButton, Title } from './styles';

export interface FolderData {
  id: number;
  name: string;
  size: number;
  createdAt: string;
  modifiedAt: string | null;
  deletedAt: string | null;
  color: string | null;
  isFavorite: boolean;
  isDeleted: boolean;
}

interface Props {
  folders: FolderData[];
}

const Folders: React.FC<Props> = (props) => {
  const { selectedFolders } = useSelector((state: RootState) => state.files);
  const dispatch = useDispatch();

  const contextMenuItems = [
    {
      id: 1,
      name: 'Copiar link',
      icon: TbLink,
      onClick: () => {},
    },
    {
      id: 2,
      name: 'Renomear',
      icon: TbPencil,
      onClick: () => {},
    },
    {
      id: 3,
      name: 'Favoritar',
      icon: TbHeart,
      onClick: () => {},
    },
    {
      id: 4,
      name: 'Fazer download',
      icon: TbDownload,
      onClick: () => {},
    },
    {
      id: 5,
      name: 'Excluir',
      icon: TbTrash,
      onClick: () => {},
    },
    {
      id: 6,
      name: 'Informações',
      icon: TbInfoCircle,
      onClick: () => {},
    },
  ];

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
    e.stopPropagation();
    e.preventDefault();

    handleSelectFolder(e, id);

    dispatch(showMenu({ items: contextMenuItems, xPos: e.pageX, yPos: e.pageY }));
  };

  const handleSelectFolder = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
    e.stopPropagation();

    let foldersIds = [];

    if (e.metaKey && selectedFolders.length > 0) {
      if (selectedFolders.includes(id)) {
        foldersIds = selectedFolders.filter((i) => i !== id);
      } else {
        foldersIds = [...selectedFolders, id];
      }
    } else if (e.shiftKey && selectedFolders.length > 0) {
      const firstSelected = selectedFolders[0];
      const currentSelected = id;
      const first = Math.min(firstSelected, currentSelected);
      const last = Math.max(firstSelected, currentSelected);

      foldersIds = props.folders.filter((f) => f.id >= first && f.id <= last).map((f) => f.id);
    } else {
      foldersIds = [id];
    }

    dispatch(selectFolders({ ids: foldersIds }));
  };

  const renderFolders = () => {
    return props.folders.map((folder) => (
      <Folder
        key={folder.id}
        selected={selectedFolders.includes(folder.id)}
        onClickCapture={(e) => handleSelectFolder(e, folder.id)}
        onContextMenu={(e) => handleContextMenu(e, folder.id)}
      >
        <FaFolder size={20} color={folder.color || undefined} />
        {folder.name}
      </Folder>
    ));
  };

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
