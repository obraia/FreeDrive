import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaFolder } from 'react-icons/fa';
import { TbArrowUp, TbDownload, TbHeart, TbHeartBroken, TbInfoCircle, TbLink, TbPencil, TbTrash } from 'react-icons/tb';
import { RootState } from '../../../../../infrastructure/redux/store';
import { selectFolders, setContextMenuItems } from '../../reducers/files.reducer';
import { hideMenu, showMenu } from '../../../../../infrastructure/redux/reducers/contextmenu';
import { Body, Container, Folder, Header, SortButton, Title, FavoriteLabel } from './styles';
import { MdRestore } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { IFolderChild } from '../../../../../infrastructure/services/folder/interfaces';
import { HomeControllerType } from '../../pages/home/home.controller';
import { ContextMenuItem } from '../../../shared/components/layout_components/contextmenu';

interface Props {
  folders: IFolderChild[];
  handleFavorite: (ids: string[], type: HomeControllerType, favorite: boolean) => Promise<void>;
  handleDownload: (ids: string[], type: HomeControllerType) => Promise<void>;
  handleDelete: (ids: string[], type: HomeControllerType) => Promise<void>;
}

const Folders: React.FC<Props> = (props) => {
  const { selectedFolders } = useSelector((state: RootState) => state.files);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const regularContextMenuItems = (folder: Partial<IFolderChild>) => [
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
      onClick: () => props.handleFavorite(selectedFolders, 'Folder', !Boolean(folder.favorite)),
    },
    {
      id: 4,
      name: 'Fazer download',
      icon: TbDownload,
      single: false,
      onClick: () => props.handleDownload(selectedFolders, 'Folder'),
    },
    {
      id: 5,
      name: 'Excluir',
      icon: TbTrash,
      single: false,
      onClick: () => props.handleDelete(selectedFolders, 'Folder'),
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

  const getContextMenuItems = (): ContextMenuItem[] => {
    const folders = props.folders.filter((f) => selectedFolders.includes(f._id));

    const hasFavorite = folders.every((f) => f.favorite) || (folders[0].favorite && folders.length === 1);
    const hasDeleted = folders.some((f) => f.deleted);

    const contextItems = hasDeleted
      ? deletedContextMenuItems()
      : regularContextMenuItems({
          favorite: hasFavorite,
        });

    return contextItems;
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    e.stopPropagation();
    e.preventDefault();

    handleSelectFolder(e, index);

    dispatch(showMenu({ items: getContextMenuItems(), xPos: e.pageX, yPos: e.pageY }));
  };

  const handleSelectFolder = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    e.stopPropagation();

    const folder = props.folders[index];

    if (e.buttons === 2 && selectedFolders.length >= 1 && selectedFolders.includes(folder._id)) {
      return;
    }

    dispatch(hideMenu());

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

  const goToFolder = (folder: IFolderChild) => {
    navigate(folder._id);
  };

  const renderFolders = () => {
    return props.folders.map((folder, index) => (
      <Folder
        key={folder._id}
        id={'folder_' + folder._id}
        className={selectedFolders.includes(folder._id) ? 'selected' : ''}
        onMouseDownCapture={(e) => handleSelectFolder(e, index)}
        onContextMenu={(e) => handleContextMenu(e, index)}
        onDoubleClick={() => goToFolder(folder)}
      >
        {folder.favorite && <FavoriteLabel children={<TbHeart />} />}
        <FaFolder size={20} color={folder.color || undefined} />
        {folder.folderName}
      </Folder>
    ));
  };

  useEffect(() => {
    if (selectedFolders.length > 0) {
      dispatch(setContextMenuItems({ items: getContextMenuItems() }));
    }
  }, [selectedFolders, props.folders]);

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
