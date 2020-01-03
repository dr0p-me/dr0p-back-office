import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

import { useFirebase } from '../../../services/firebase'
import Upload from '../../../icons/Upload'
import Spinner from '../../../icons/Spinner'

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const Wrapper = styled.div<{ active: boolean }>`
  border: 4px dashed ${p => (p.active ? '#73738b' : '#b2b2c0')};
  border-radius: 12px;
  color: ${p => (p.active ? '#73738b' : '#b2b2c0')};
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  transition: all 250ms ease-out;
`

const CurrentImageFallback = styled.div`
  width: 96px;
  height: 96px;
  border: 4px dashed #b2b2c0;
  border-radius: 12px;
  color: #b2b2c0;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 24px;
  margin-right: 24px;
`

const CurrentImage = styled.div`
  width: 96px;
  height: 96px;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 24px;
  position: relative;

  img {
    width: 100%;
    max-width: 100%;
    border-radius: 12px;
  }
`

const Tag = styled.div`
  position: absolute;
  background-color: #6988ff;
  padding: 4px;
  border-radius: 4px;
  color: white;
  font-family: Inter;
  font-weight: 600;
  top: 0;
  right: 0;
  transform: translateX(50%) translateY(-50%);
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Text = styled.p`
  font: Inter;
  font-weight: 600;
  font-size: 14px;
  color: inherit;
`

const SaveButton = styled.button`
  width: 152px;
  padding: 8px;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #6988ff;
  color: white;
  cursor: pointer;
  margin-left: auto;
  margin-top: 24px;

  &:disabled {
    background: #b2b2c0;
    color: #73738b;
  }

  svg {
    height: 40px;
  }
`

const SaveButtonText = styled.div`
  color: inherit;
  font-size: 24px;
  font-weight: 600;
  padding-right: 12px;
`

type Props = {
  onChangeImage: (image: string) => void
  currentImage?: string
}

const ImageInput = ({ onChangeImage, currentImage }: Props) => {
  const firebase = useFirebase()
  const [files, setFiles] = useState<(File & { preview: string })[]>([])
  const [saving, setSaving] = useState(false)
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
    setSaving(true)
    const file = files[0]
    const ref = storageRef.child(`${file.name}`)
    await ref.put(file)
    const dlLink = await ref.getDownloadURL()
    onChangeImage(dlLink)
    setSaving(false)
    setFiles([])
  }, [files])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' })

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [])

  return (
    <Container>
      <Row>
        {files.length ? (
          files.map(file => (
            <CurrentImage key={file.name}>
              <img src={file.preview} />
            </CurrentImage>
          ))
        ) : (
          <CurrentImageFallback>
            <Text>no preview</Text>
          </CurrentImageFallback>
        )}
        {currentImage ? (
          <CurrentImage>
            <img src={currentImage} />
            <Tag>current</Tag>
          </CurrentImage>
        ) : null}
      </Row>
      <Wrapper {...getRootProps()} active={isDragActive}>
        <input {...getInputProps()} />
        <Text>
          {isDragActive
            ? 'Drop the files here ...'
            : "Drag 'n' drop some files here, or click to select files"}
        </Text>
      </Wrapper>

      <SaveButton onClick={saving ? undefined : onSaveImage} disabled={!files.length}>
        <SaveButtonText>Save</SaveButtonText>
        {saving ? <Spinner /> : <Upload />}
      </SaveButton>
    </Container>
  )
}

export default ImageInput
