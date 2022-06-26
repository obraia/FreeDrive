import React from 'react';
import { IconType } from 'react-icons';
import { TbDownload, TbHeart, TbInfoCircle, TbLink, TbPencil, TbTrash } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { BiSelectMultiple } from 'react-icons/bi';
import { RootState } from '../../../../../infrastructure/redux/store';
import { Row } from '../layout_components/row';
import { Container, Separator, TopbarButton } from './styles';

export interface TopbarItem {
  id: number;
  name: string;
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Topbar: React.FC = () => {
  const { selectedFiles, selectedFolders } = useSelector((state: RootState) => state.files);
  const { headerTitle } = useSelector((state: RootState) => state.pages);

  const items = [
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
      name: 'Favoritar',
      icon: TbHeart,
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

  const renderTotalSelected = () => {
    const total = selectedFiles.length + selectedFolders.length;

    if (total > 0) {
      return (
        <>
          <Separator />
          <TopbarButton>
            {selectedFiles.length + selectedFolders.length}
            <BiSelectMultiple size={18} />
          </TopbarButton>
        </>
      );
    }
  };

  const renderItems = () => {
    const hasSelectedFiles = Boolean(selectedFiles.length || selectedFolders.length);

    if (!hasSelectedFiles) return;

    const isSingleSelection = selectedFiles.length + selectedFolders.length === 1;

    return items
      .filter((i) => isSingleSelection || !i.single)
      .map((i) => (
        <TopbarButton key={i.id} onClick={i.onClick}>
          {<i.icon size={18} />}
        </TopbarButton>
      ));
  };

  return (
    <Container>
      <TopbarButton>{headerTitle}</TopbarButton>
      <Row>
        {renderItems()}
        {renderTotalSelected()}
      </Row>
    </Container>
  );
};

export { Topbar };
