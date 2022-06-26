import React, { Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../infrastructure/redux/store';
import { SelectionController } from './controller';

export interface Props {
  xMax?: number;
  yMax?: number;
}

const Selection: React.FC<Props> = (props) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const ref = useRef(null);

  const dispatch = useDispatch();

  const childrenRef = React.cloneElement(props.children as any, { ref });

  useEffect(() => {
    const controller = new SelectionController({
      container: ref.current!,
      items: [],
      mode: 'STRICT',
      onSelectionChange: (items) => {},
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
