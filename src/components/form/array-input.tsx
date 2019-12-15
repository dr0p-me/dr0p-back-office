import React, { useEffect, useState, createRef, useCallback } from 'react'

const SubList = ({ data }: { data: any[] }) => {
  const [list, setList] = useState([...data])

  useEffect(() => {
    setList([...data])
  }, [data])

  return (
    <ul>
      {list.map(el => (
        <li key={el}>{el}</li>
      ))}
    </ul>
  )
}

interface Props {
  values: any[]
  id: string
  title: string
  setNewValue: (value: any) => void
}

const ArrayInput = ({ values, setNewValue, id, title }: Props) => {
  const inputRef = createRef<HTMLInputElement>()
  const [value, setValue] = useState('')

  const onChange = useCallback(
    (e: React.SyntheticEvent<HTMLInputElement>) => {
      console.log(e.currentTarget.value)
      setValue(e.currentTarget.value)
    },
    [setValue]
  )

  const onKeyUpHandler = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.keyCode === 13) {
        const newValues = new Set([...values, value])
        console.log(newValues)
        setNewValue([...newValues])
        setValue('')
      }
    },
    [setNewValue, setValue, value]
  )

  return (
    <>
      <label htmlFor={id}>{title}</label>
      <input
        ref={inputRef}
        type="text"
        id={id}
        onKeyUp={onKeyUpHandler}
        onChange={onChange}
        value={value}
      />
      <SubList data={values} />
    </>
  )
}

export default ArrayInput
