import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

import { useFirebase } from '../../../services/firebase'

const Wrapper = styled.div`
  border: 1px solid white;
  background-color: rgba(255, 255, 255, 0.1);
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`

type Props = {
  onChangeImage: (image: string) => void
  currentImage?: string
}

const ImageInput = ({ onChangeImage, currentImage }: Props) => {
  const firebase = useFirebase()
  const [files, setFiles] = useState<(File & { preview: string })[]>([])
  const storageRef = firebase.storage().ref('covers')

  const onDrop = useCallback(
    acceptedFiles => {
      console.log(acceptedFiles)
      const newFiles = acceptedFiles.map((file: File) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
      setFiles(newFiles)
    },
    [setFiles]
  )

  const onSaveImage = useCallback(async () => {
    if (!files.length) return
    const file = files[0]
    console.log(file)
    const ref = storageRef.child(`${file.name}`)
    console.log(ref)
    await ref.put(file)
    const dlLink = await ref.getDownloadURL()
    console.log(dlLink)
    onChangeImage(dlLink)
  }, [files])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' })

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [])
  return (
    <>
      {currentImage ? (
        <div>
          <img src={currentImage} width="100" />
        </div>
      ) : null}
      <Wrapper {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag n drop some files here, or click to select files</p>
        )}
      </Wrapper>
      {files.length
        ? files.map(file => (
            <span key={file.name}>
              <div>
                <img src={file.preview} style={{ width: 50 }} />
              </div>
            </span>
          ))
        : null}
      <button onClick={onSaveImage} disabled={!files.length}>
        save
      </button>
    </>
  )
}

export default ImageInput
