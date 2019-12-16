import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import Input from './input'

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
  label: React.ReactNode;
  htmlFor: string;
  id: string;
  values: string[];
  setNewValue: (value: string[]) => void;
}

const ArrayInput = ({
  values,
  setNewValue,
  id,
  label,
  htmlFor,
}: Props) => {
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

  const removeValue = useCallback(
    (el: string) => {
      const set = new Set([...values])
      set.delete(el)
      setNewValue([...set])
    },
    [setNewValue, values]
  )

  return (
    <>
      <Input
        label={label}
        htmlFor={htmlFor}
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUpHandler}
      />
      <SubList data={values} remove={removeValue} />
    </>
  )
}

export default ArrayInput
