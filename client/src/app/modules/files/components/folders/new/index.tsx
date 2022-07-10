import React, { useLayoutEffect } from 'react'

import { Modal } from '../../../../shared/components/modal'
import { Input } from '../../../../shared/components/input'

import {
  ModalFooter,
  ModalFooterButton,
} from '../../../../shared/components/modal/styles'

interface Props {
  onClose: () => void
  onCreate: (folderName: string) => void
}

const NewFolder: React.FC<Props> = (props) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleCreate = () => {
    const { current: input } = inputRef

    if (input) {
      props.onCreate(input.value)
    }
  }

  useLayoutEffect(() => {
    const { current: input } = inputRef

    if (input) {
      input.focus()
      input.select()
    }
  }, [])

  return (
    <Modal
      title={'Nova pasa'}
      width={'400px'}
      onCloseModal={props.onClose}
      onConfirm={handleCreate}
    >
      <Input
        ref={inputRef}
        placeholder="Nome da pasta"
        defaultValue={'Nova pasta'}
      />

      <ModalFooter>
        <ModalFooterButton onClick={props.onClose}>Cancelar</ModalFooterButton>
        <ModalFooterButton className="confirm" onClick={handleCreate}>
          Criar
        </ModalFooterButton>
      </ModalFooter>
    </Modal>
  )
}

export { NewFolder }
