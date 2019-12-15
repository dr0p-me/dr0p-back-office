import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  width: 100%;
  position: relative;
  background-color: rgba(255, 255, 255, 0.6);
  color: #913d75;
  font-size: 48px;
  display: flex;
  border: none;
  outline: none;
  padding: 8px 32px 8px 16px;
  border-top-right-radius: 32px;
  border-bottom-right-radius: 32px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 1;
`

const Label = styled.label`
  color: #913d75;
  background-color: rgba(255, 255, 255, 0.6);
  text-transform: capitalize;
  font-size: 48px;
  padding: 8px 16px 8px 32px;
  border-top-left-radius: 32px;
  border-bottom-left-radius: 32px;
`

const Input = ({
  label,
  htmlFor,
  type,
  id,
  onChange,
  value,
}: {
  label: string;
  htmlFor: string;
  type: string;
  id: string;
  onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  value: string;
}) => (
  <Wrapper>
    <Label htmlFor={htmlFor}>{label}</Label>
    <StyledInput id={id} type={type} onChange={onChange} value={value} />
  </Wrapper>
)

export default Input