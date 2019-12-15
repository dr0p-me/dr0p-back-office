import React, { useEffect, useState, createRef, useCallback } from 'react'
import styled from 'styled-components'

const SubItem = styled.li`
  position: relative;
  display: inline-box;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #913d75;
  color: white;

  :hover {
    background-color: red;
  }
`

const SubList = ({ data, remove }: { data: string[]; remove: (el: string) => void }) => {
  const [list, setList] = useState(data)
  const onRemove = useCallback((el: string) => {
    remove(el)
  }, [remove])

  useEffect(() => {
    setList([...data])
  }, [data])

  return (
    <ul>
      {list.map(el => (
        <SubItem key={el} onClick={() => onRemove(el)}>{el}</SubItem>
      ))}
    </ul>
  )
}

interface Props {
  values: string[];
  id: string;
  title: string;
  setNewValue: (value: string[]) => void;
}

const ArrayInput = ({ values, setNewValue, id, title }: Props) => {
  const inputRef = createRef<HTMLInputElement>()
  const [value, setValue] = useState('')

  const onChange = useCallback(
    (e: React.SyntheticEvent<HTMLInputElement>) =>
      setValue(e.currentTarget.value),
    [setValue]
  )

  const onKeyUpHandler = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.keyCode === 13) {
        const newValues = new Set([...values, value])
        setNewValue([...newValues])
        setValue('')
      }
    },
    [setNewValue, setValue, value]
  )

  const removeValue = useCallback((el: string) => {
    const set = new Set([...values])
    set.delete(el)
    setNewValue([ ...set ])
  }, [setNewValue, values])

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
      <SubList data={values} remove={removeValue} />
    </>
  )
}

export default ArrayInput
