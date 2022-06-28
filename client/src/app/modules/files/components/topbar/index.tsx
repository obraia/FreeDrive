import React, { Fragment } from 'react';
import { IconType } from 'react-icons';
import { useSelector } from 'react-redux';
import { BiChevronRight, BiSelectMultiple } from 'react-icons/bi';
import { RootState } from '../../../../../infrastructure/redux/store';
import { Row } from '../../../shared/components/layout_components/row';
import { Container, Separator, TopbarButton } from './styles';
import { useNavigate } from 'react-router-dom';

export interface TopbarItem {
  id: number;
  name: string;
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Topbar: React.FC = () => {
  const { selectedFiles, selectedFolders, contextMenuItems } = useSelector((state: RootState) => state.files);
  const { pathSequence } = useSelector((state: RootState) => state.pages);

  const navigate = useNavigate();

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

    return contextMenuItems
      .filter((i) => isSingleSelection || !i.single)
      .map((i) => (
        <TopbarButton key={i.id} onClick={i.onClick}>
          {<i.icon size={18} />}
        </TopbarButton>
      ));
  };

  const renderPath = () => {
    if (!pathSequence.length) return;

    return pathSequence.map((p, i) => (
      <Fragment key={p.id}>
        <TopbarButton onClick={() => navigate('drive/' + p.id)}>{p.name}</TopbarButton>
        {i !== pathSequence.length - 1 && <BiChevronRight />}
      </Fragment>
    ));
  };

  return (
    <Container>
      <Row>{renderPath()}</Row>
      <Row>
        {renderItems()}
        {renderTotalSelected()}
      </Row>
    </Container>
  );
};

export { Topbar };
