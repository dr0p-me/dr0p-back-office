import React from 'react'

import Input from '../input'

type Props = {
  onChange: (e: React.SyntheticEvent<HTMLInputElement>, key: string) => void;
  value: string;
}

const NumberInput = ({ onChange, value }: Props) => (
  <Input
    htmlFor="number"
    type="number"
    label="number"
    id="number"
    value={value}
    onChange={e => onChange(e, 'number')}
  />
)

export default NumberInput
