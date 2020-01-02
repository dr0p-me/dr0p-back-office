import React, { useState } from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  width: 100%;
  position: relative;
  background-color: rgba(255, 255, 255, 0.6);
  /* color: #913d75; */
  color: #e9225e;
  font-size: 32px;
  display: flex;
  border: none;
  outline: none;
  padding: 8px 32px 8px 8px;
  border-top-right-radius: 48px;
  border-bottom-right-radius: 48px;
  transition: background-color 350ms ease-out;

  :focus {
    background-color: rgba(255, 255, 255, 0.8);
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 1;
`

type Props = {
  focused: boolean
}

const Label = styled.label<Props>`
  display: flex;
  align-items: center;
  /* color: #913d75; */
  color: #e9225e;
  background-color: rgba(255, 255, 255, ${p => (p.focused ? '0.8' : '0.6')});
  text-transform: capitalize;
  font-size: 32px;
  font-weight: bold;
  padding: 8px 8px 8px 32px;
  border-top-left-radius: 32px;
  border-bottom-left-radius: 32px;
  transition: background-color 350ms ease-out;
  white-space: nowrap;
`

type InputProps = {
  label: React.ReactNode
  htmlFor: string
  type: string
  id: string
  onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void
  onKeyUp?: (e: React.KeyboardEvent) => void
  value: string
}

const Input = ({ label, htmlFor, type, id, onChange, value, onKeyUp }: InputProps) => {
  const [focused, setFocused] = useState(false)
  const renderLabel = typeof label === 'string' ? `${label} :` : label
  return (
    <Wrapper>
      <Label htmlFor={htmlFor} focused={focused}>
        {renderLabel}
      </Label>
      <StyledInput
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </Wrapper>
  )
}

export default Input
