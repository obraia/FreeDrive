import React, { useLayoutEffect, useState } from 'react'

import { Modal } from '../../../../shared/components/modal'
import { Input } from '../../../../shared/components/input'

import {
  ModalFooter,
  ModalFooterButton,
  ModalFooterCheckbox,
} from '../../../../shared/components/modal/styles'

interface Props {
  files: File[]
  onClose: () => void
  onReplace: (fileName: string) => void
}

const ReplaceFiles: React.FC<Props> = (props) => {
  const [replaceAll, setReplaceAll] = useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleReplace = () => {
    const { current: input } = inputRef

    if (input) {
      props.onReplace(input.value)
    }
  }

  const getReplacedFileName = (file: File) => {
    const parts = file.name.split('.')
    const extension = parts.pop()
    const name = `${parts.join('.')} (1)`

    return {
      fileName: `${name}.${extension}`,
      nameRange: name.length,
    }
  }

  const toggleReplaceAll = () => {
    setReplaceAll((value) => !value)
  }

  useLayoutEffect(() => {
    const { current: input } = inputRef
    const {
      files: [file],
    } = props

    if (input && file) {
      const { fileName, nameRange } = getReplacedFileName(file)
      input.defaultValue = fileName
      input.setSelectionRange(0, nameRange)
      input.focus()
    }
  }, [props.files[0]])

  return (
    <Modal
      title={'Substituir arquivo'}
      width={'400px'}
      onCloseModal={props.onClose}
      onConfirm={handleReplace}>
      <Input ref={inputRef} placeholder="Nome do arquivo" />

      <ModalFooter>
        <ModalFooterCheckbox checked={replaceAll} onClick={toggleReplaceAll}>
          Repetir para todos
        </ModalFooterCheckbox>
        <ModalFooterButton onClick={props.onClose}>Renomear</ModalFooterButton>
        <ModalFooterButton className="confirm" onClick={handleReplace}>
          Substituir
        </ModalFooterButton>
      </ModalFooter>
    </Modal>
  )
}

export { ReplaceFiles }
