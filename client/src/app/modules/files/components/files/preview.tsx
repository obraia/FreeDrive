import React, { useEffect, useState } from 'react'
import { TbFile } from 'react-icons/tb'
import { IFile } from '../../../../../infrastructure/services/file/file.service.d'

export interface Props {
  file: IFile
}

const Preview: React.FC<Props> = (props) => {
  const [type, setType] = useState<string>('')

  const options = (type: string, src: string) =>
    ({
      image: <img src={src} alt="Preview" />,
      video: <video src={src} controls preload="none" />,
      audio: <audio src={src} controls />,
      pdf: <iframe src={src} title="pdf" />,
    }[type])

  const handleFileType = (file: IFile) => {
    if (file.mimetype.includes('image')) {
      setType('image')
    } else if (file.mimetype.includes('video')) {
      setType('video')
    } else if (file.mimetype.includes('audio')) {
      setType('audio')
    } else if (file.mimetype.includes('application/pdf')) {
      setType('pdf')
    } else {
      setType('file')
    }
  }

  useEffect(() => {
    handleFileType(props.file)
  }, [props.file])

  return (
    options(
      type,
      'http://localhost:3003/api/static/thumbs/' + props.file.fileName,
    ) || <TbFile size={36} />
  )
}

export { Preview }
