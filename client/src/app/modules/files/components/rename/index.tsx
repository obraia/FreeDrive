import React, { useLayoutEffect } from 'react';
import { Modal } from '../../../shared/components/modal';
import { ModalFooter, ModalFooterButton } from '../../../shared/components/modal/styles';
import { Input } from '../../../shared/components/input';

interface Props {
  initialValue?: string;
  title: string;
  onClose: () => void;
  onRename: (folderName: string) => void;
}

const Rename: React.FC<Props> = (props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleRename = () => {
    const { current: input } = inputRef;

    if (input) {
      props.onRename(input.value);
      props.onClose();
    }
  };

  useLayoutEffect(() => {
    const { current: input } = inputRef;

    if (input) {
      input.focus();
      input.select();
    }
  }, []);

  return (
    <Modal title={props.title} width={'400px'} onCloseModal={props.onClose} onConfirm={handleRename}>
      <Input ref={inputRef} placeholder='Nome da pasta' defaultValue={props.initialValue} />

      <ModalFooter>
        <ModalFooterButton onClick={props.onClose}>Cancelar</ModalFooterButton>
        <ModalFooterButton className='confirm' onClick={handleRename}>
          Renomear
        </ModalFooterButton>
      </ModalFooter>
    </Modal>
  );
};

export { Rename };
