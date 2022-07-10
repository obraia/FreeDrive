import React from 'react';
import { useDragLayer } from 'react-dnd';
import { IFileChild } from '../../../../../infrastructure/services/folder/interfaces';
import { FileDragPreview } from '../files/file/dragPreview';
import { Container } from './styles';

interface Props {
  file: IFileChild;
}

enum ItemTypes {
  FILE = 'FILE',
  FOLDER = 'FOLDER',
}

const DragLayer: React.FC<Props> = (props) => {
  const { itemType, isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const renderItem = (type: ItemTypes, item: any) => {
    switch (type) {
      case ItemTypes.FILE:
        return <FileDragPreview file={props.file} currentOffset={currentOffset} />;
      default:
        return null;
    }
  };

  return isDragging ? <Container>{renderItem(itemType as any, item)}</Container> : null;
};

export { DragLayer, ItemTypes };
