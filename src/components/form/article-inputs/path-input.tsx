import React from 'react'

import Input from '../input'

type Props = {
  onChange: (e: React.SyntheticEvent<HTMLInputElement>, key: string) => void;
  value: string;
}

const PathInput = ({ onChange, value }: Props) => (
  <Input
    htmlFor="path"
    type="text"
    label="path"
    id="path"
    value={value}
    onChange={e => onChange(e, 'path')}
  />
)

export default PathInput
