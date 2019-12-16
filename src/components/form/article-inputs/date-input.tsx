import React from 'react'

import Input from '../input'

type Props = {
  onChange: (e: React.SyntheticEvent<HTMLInputElement>, key: string) => void;
  value: string;
}

const DateInput = ({ onChange, value }: Props) => (
  <Input
    htmlFor="date"
    type="date"
    label="date"
    id="date"
    value={value}
    onChange={e => onChange(e, 'date')}
  />
)

export default DateInput
