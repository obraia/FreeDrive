import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../infrastructure/redux/store";
import { SelectionController } from "./controller";

export interface Props {
  xMax?: number;
  yMax?: number;
}

const Selection: React.FC<Props> = (props) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const ref = useRef(null);

  const dispatch = useDispatch();

  const [box, setBox] = useState({
    current: { x: 0, y: 0 },
    start: { x: 0, y: 0 },
    isDragging: false,
  });

  const [mouse, setMouse] = useState({
    left: "0",
    top: "0",
    scaleX: 0,
    scaleY: 0,
  });

  const childrenRef = React.cloneElement(props.children as any, { ref });

  useEffect(() => {
    if (ref.current) {
      const controller = new SelectionController({
        container: ref.current,
        items: [],
        mode: "STRICT",
        onSelectionChange: (items) => {},
        selectedClass: "selected",
        selection: {} as any,
        selectionClass: "selection",
        color: theme.colors.primary,
      });
    }
  }, [ref, theme.colors.primary]);

  return <Fragment>{childrenRef}</Fragment>;
};

export { Selection };
