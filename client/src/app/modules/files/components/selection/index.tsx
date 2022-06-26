import React, { Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../infrastructure/redux/store';
import { selectFiles, selectFolders } from '../../reducers/files.reducer';
import { SelectionController } from './controller';

export interface Props {
  onFilesSelectionChange?: (ids: number[]) => void;
  onFoldersSelectionChange?: (ids: number[]) => void;
}

const Selection: React.FC<Props> = (props) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  const ref = useRef(null);
  const childrenRef = React.cloneElement(props.children as any, { ref });

  const handleSelectFiles = (ids: number[]) => {
    dispatch(selectFiles({ ids }));
  };

  const handleSelectFolders = (ids: number[]) => {
    dispatch(selectFolders({ ids }));
  };

  useEffect(() => {
    const files = Array.from(document.querySelectorAll(`[id^="file_"]`));
    const folders = Array.from(document.querySelectorAll(`[id^="folder_"]`));

    const controller = new SelectionController({
      container: ref.current!,
      files: files,
      folders: folders,
      mode: 'LOOSE',
      onFilesSelectionChange: handleSelectFiles,
      onFoldersSelectionChange: handleSelectFolders,
      selectedClass: 'selected',
      selection: {} as any,
      selectionClass: 'selection',
      color: theme.colors.primary,
    });

    return () => {
      controller.destroy();
    };
  });

  return <Fragment>{childrenRef}</Fragment>;
};

export { Selection };
