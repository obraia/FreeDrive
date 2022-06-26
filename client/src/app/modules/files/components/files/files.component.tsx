import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../infrastructure/redux/store';
import { selectFiles } from '../../reducers/files.reducer';
import { showMenu } from '../../../../../infrastructure/redux/reducers/contextmenu';
import { Preview } from './preview.component';
import { Body, Container, File, FileName, Header, SortButton, Title } from './styles';
import { TbArrowUp, TbDownload, TbHeart, TbHeartBroken, TbInfoCircle, TbLink, TbPencil, TbTrash } from 'react-icons/tb';
import { MdRestore } from 'react-icons/md';

export interface FileData {
  id: number;
  name: string;
  type: string;
  size: number;
  createdAt: string;
  modifiedAt: string | null;
  deletedAt: string | null;
  url: string;
  isFavorite: boolean;
  isDeleted: boolean;
}

interface Props {
  files: FileData[];
}

const Files: React.FC<Props> = (props) => {
  const { selectedFiles } = useSelector((state: RootState) => state.files);
  const dispatch = useDispatch();

  const regularContextMenuItems = (file: FileData) => [
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
      name: file.isFavorite ? 'Desfavoritar' : 'Favoritar',
      icon: file.isFavorite ? TbHeartBroken : TbHeart,
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

  const deletedContextMenuItems = () => [
    {
      id: 5,
      name: 'Restaurar',
      icon: MdRestore,
      onClick: () => {},
    },
    {
      id: 5,
      name: 'Excluir permanentemente',
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

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, file: FileData) => {
    e.stopPropagation();
    e.preventDefault();

    handleSelectFile(e, file);

    const contextItems = file.isDeleted ? deletedContextMenuItems() : regularContextMenuItems(file);

    dispatch(showMenu({ items: contextItems, xPos: e.pageX, yPos: e.pageY }));
  };

  const handleSelectFile = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, file: FileData) => {
    e.stopPropagation();

    let filesIds = [];

    if (e.metaKey && selectedFiles.length > 0) {
      if (selectedFiles.includes(file.id)) {
        filesIds = selectedFiles.filter((i) => i !== file.id);
      } else {
        filesIds = [file.id, ...selectedFiles];
      }
    } else if (e.shiftKey && selectedFiles.length > 0) {
      const firstSelected = selectedFiles[0];
      const currentSelected = file.id;
      const first = Math.min(firstSelected, currentSelected);
      const last = Math.max(firstSelected, currentSelected);

      filesIds = props.files.filter((f) => f.id >= first && f.id <= last).map((f) => f.id);
    } else {
      filesIds = [file.id];
    }

    dispatch(selectFiles({ ids: filesIds }));
  };

  const renderFiles = () => {
    return props.files.map((file) => (
      <File
        key={file.id}
        selected={selectedFiles.includes(file.id)}
        onClickCapture={(e) => handleSelectFile(e, file)}
        onContextMenu={(e) => handleContextMenu(e, file)}
      >
        <Preview src={file.url} />
        <FileName>{file.name}</FileName>
      </File>
    ));
  };

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
