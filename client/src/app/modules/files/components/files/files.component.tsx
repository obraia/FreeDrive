import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TbArrowUp, TbDownload, TbHeart, TbHeartBroken, TbInfoCircle, TbLink, TbPencil, TbTrash } from 'react-icons/tb';
import { MdRestore } from 'react-icons/md';
import { RootState } from '../../../../../infrastructure/redux/store';
import { selectFiles, setContextMenuItems } from '../../reducers/files.reducer';
import { hideMenu, showMenu } from '../../../../../infrastructure/redux/reducers/contextmenu';
import { Preview } from './preview.component';
import { Body, Container, FavoriteLabel, File, FileName, Header, SortButton, Title } from './styles';
import { IFileChild } from '../../../../../infrastructure/services/folder/interfaces';
import { middleTruncateString } from '../../../shared/utils/formatters/string.formatter';
import { HomeControllerType } from '../../pages/home/home.controller';
import { ContextMenuItem } from '../../../shared/components/layout_components/contextmenu';

interface Props {
  files: IFileChild[];
  selectedFiles?: number[];
  handleFavorite: (ids: string[], type: HomeControllerType, favorite: boolean) => Promise<void>;
  handleDownload: (ids: string[], type: HomeControllerType) => Promise<void>;
  handleDelete: (ids: string[], type: HomeControllerType) => Promise<void>;
}

const Files: React.FC<Props> = (props) => {
  const { selectedFiles } = useSelector((state: RootState) => state.files);
  const dispatch = useDispatch();

  const regularContextMenuItems = (file: Partial<IFileChild>) => [
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
      name: file.favorite ? 'Desfavoritar' : 'Favoritar',
      icon: file.favorite ? TbHeartBroken : TbHeart,
      single: false,
      onClick: () => props.handleFavorite(selectedFiles, 'File', !Boolean(file.favorite)),
    },
    {
      id: 4,
      name: 'Fazer download',
      icon: TbDownload,
      single: false,
      onClick: () => props.handleDownload(selectedFiles, 'File'),
    },
    {
      id: 5,
      name: 'Excluir',
      icon: TbTrash,
      single: false,
      onClick: () => props.handleDelete(selectedFiles, 'File'),
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
    const files = props.files.filter((f) => selectedFiles.includes(f._id));

    const hasFavorite = files.every((f) => f.favorite) || (files[0].favorite && files.length === 1);
    const hasDeleted = files.some((f) => f.deleted);

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

    handleSelectFile(e, index);

    dispatch(showMenu({ items: getContextMenuItems(), xPos: e.pageX, yPos: e.pageY }));
  };

  const handleSelectFile = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    e.stopPropagation();

    const file = props.files[index];

    if (e.buttons === 2 && selectedFiles.length >= 1 && selectedFiles.includes(file._id)) {
      return;
    }

    dispatch(hideMenu());

    let filesIds = [] as string[];

    if (e.metaKey && selectedFiles.length > 0) {
      if (selectedFiles.includes(file._id)) {
        filesIds = selectedFiles.filter((i) => i !== file._id);
      } else {
        filesIds = [file._id, ...selectedFiles];
      }
    } else if (e.shiftKey && selectedFiles.length > 0) {
      const firstSelected = selectedFiles[0];
      const firstIndex = props.files.findIndex((f) => f._id === firstSelected);
      const first = Math.min(firstIndex, index);
      const last = Math.max(firstIndex, index);

      filesIds = props.files.filter((f, i) => i >= first && i <= last).map((f) => f._id);
    } else {
      filesIds = [file._id];
    }

    dispatch(selectFiles({ ids: filesIds }));
  };

  const renderFiles = () => {
    return props.files.map((file, index) => (
      <File
        key={file._id}
        id={'file_' + file._id}
        className={selectedFiles.includes(file._id) ? 'selected' : ''}
        onMouseDownCapture={(e) => handleSelectFile(e, index)}
        onContextMenu={(e) => handleContextMenu(e, index)}
      >
        {file.favorite && <FavoriteLabel children={<TbHeart />} />}
        <Preview file={file} />
        <FileName>{middleTruncateString(file.originalName, 15)}</FileName>
      </File>
    ));
  };

  useEffect(() => {
    if (selectedFiles.length > 0) {
      dispatch(setContextMenuItems({ items: getContextMenuItems() }));
    }
  }, [selectedFiles, props.files]);

  return (
    <Container>
      <Header>
        <Title>Arquivos</Title>
        <SortButton>
          Nome
          <TbArrowUp size={20} />
        </SortButton>
      </Header>

      <Body>{renderFiles()}</Body>
    </Container>
  );
};

export { Files };
