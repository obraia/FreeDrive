import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TbArrowUp, TbDownload, TbHeart, TbHeartBroken, TbInfoCircle, TbLink, TbPencil, TbTrash } from 'react-icons/tb';
import { MdRestore } from 'react-icons/md';
import { RootState } from '../../../../../infrastructure/redux/store';
import { selectFiles, setContextMenuItems } from '../../reducers/files.reducer';
import { showMenu } from '../../../../../infrastructure/redux/reducers/contextmenu';
import { Preview } from './preview.component';
import { Body, Container, File, FileName, Header, SortButton, Title } from './styles';
import { FileChild } from '../../../../../infrastructure/services/folders/folders.type';
import { middleTruncateString } from '../../../shared/utils/formatters/string.formatter';

interface Props {
  files: FileChild[];
  selectedFiles?: number[];
}

const Files: React.FC<Props> = (props) => {
  const { selectedFiles } = useSelector((state: RootState) => state.files);
  const dispatch = useDispatch();

  const regularContextMenuItems = (file: FileChild) => [
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

    handleSelectFile(e, index);

    const file = props.files[index];

    const contextItems = file.deleted ? deletedContextMenuItems() : regularContextMenuItems(file);

    dispatch(showMenu({ items: contextItems, xPos: e.pageX, yPos: e.pageY }));
  };

  const handleSelectFile = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    e.stopPropagation();

    const file = props.files[index];

    if (e.buttons === 2 && selectedFiles.length >= 1 && selectedFiles.includes(file.id)) {
      return;
    }

    let filesIds = [] as string[];

    if (e.metaKey && selectedFiles.length > 0) {
      if (selectedFiles.includes(file.id)) {
        filesIds = selectedFiles.filter((i) => i !== file.id);
      } else {
        filesIds = [file.id, ...selectedFiles];
      }
    } else if (e.shiftKey && selectedFiles.length > 0) {
      const firstSelected = selectedFiles[0];
      const firstIndex = props.files.findIndex((f) => f.id === firstSelected);
      const first = Math.min(firstIndex, index);
      const last = Math.max(firstIndex, index);

      filesIds = props.files.filter((f, i) => i >= first && i <= last).map((f) => f.id);
    } else {
      filesIds = [file.id];
    }

    dispatch(selectFiles({ ids: filesIds }));
  };

  const renderFiles = () => {
    return props.files.map((file, index) => (
      <File
        key={file.id}
        id={'file_' + file.id}
        selected={selectedFiles.includes(file.id)}
        onClickCapture={(e) => handleSelectFile(e, index)}
        onContextMenu={(e) => handleContextMenu(e, index)}
        onMouseDownCapture={(e) => e.stopPropagation()}
      >
        <Preview file={file} />
        <FileName>{middleTruncateString(file.originalName, 15)}</FileName>
      </File>
    ));
  };

  useEffect(() => {
    if (selectedFiles.length > 0) {
      const file = props.files.find((f) => f.id === selectedFiles[0]);

      if (file) {
        const contextItems = file.deleted ? deletedContextMenuItems() : regularContextMenuItems(file);

        dispatch(setContextMenuItems({ items: contextItems }));
      }
    }
  }, [selectedFiles]);

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
