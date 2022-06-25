import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../infrastructure/redux/store';
import { selectFiles } from '../../reducers/home.reducer';
import { showMenu } from '../../../../../infrastructure/redux/reducers/context_menu';
import { Preview } from './preview.component';
import { Body, Container, File, FileName, Header, SortButton, Title } from './styles';
import { TbArrowUp, TbDownload, TbHeart, TbInfoCircle, TbLink, TbPencil, TbTrash } from 'react-icons/tb';

const Files: React.FC = () => {
  const { selectedFiles } = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch();

  const files = [
    {
      id: 1,
      name: 'photo_01.jpeg',
      url: 'https://picsum.photos/200/300',
    },
    // {
    //   id: 2,
    //   name: "dummy.pdf",
    //   url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    // },
    // {
    //   id: 3,
    //   name: "BigBuckBunny.mp4",
    //   url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    // },
    {
      id: 4,
      name: 'photo_04.jpeg',
      url: 'https://picsum.photos/200/300',
    },
    {
      id: 5,
      name: 'photo_05.jpeg',
      url: 'https://picsum.photos/200/300',
    },
    {
      id: 6,
      name: 'photo_06.jpeg',
      url: 'https://picsum.photos/200/300',
    },
    {
      id: 7,
      name: 'photo_07.jpeg',
      url: 'https://picsum.photos/200/300',
    },
    {
      id: 8,
      name: 'photo_08.jpeg',
      url: 'https://picsum.photos/200/300',
    },
    {
      id: 9,
      name: 'photo_09.jpeg',
      url: 'https://picsum.photos/200/300',
    },
  ];

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

    handleSelectFile(e, id);

    dispatch(showMenu({ items: contextMenuItems, xPos: e.pageX, yPos: e.pageY }));
  };

  const handleSelectFile = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
    e.stopPropagation();

    let filesIds = [];

    if (e.metaKey && selectedFiles.length > 0) {
      if (selectedFiles.includes(id)) {
        filesIds = selectedFiles.filter((i) => i !== id);
      } else {
        filesIds = [id, ...selectedFiles];
      }
    } else if (e.shiftKey && selectedFiles.length > 0) {
      const firstSelected = selectedFiles[0];
      const currentSelected = id;
      const first = Math.min(firstSelected, currentSelected);
      const last = Math.max(firstSelected, currentSelected);

      filesIds = files.filter((f) => f.id >= first && f.id <= last).map((f) => f.id);
    } else {
      filesIds = [id];
    }

    dispatch(selectFiles({ ids: filesIds }));
  };

  const renderFiles = () => {
    return files.map((file) => (
      <File
        key={file.id}
        selected={selectedFiles.includes(file.id)}
        onClickCapture={(e) => handleSelectFile(e, file.id)}
        onContextMenu={(e) => handleContextMenu(e, file.id)}
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
