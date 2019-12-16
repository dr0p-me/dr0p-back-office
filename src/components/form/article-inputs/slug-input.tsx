import React from 'react'

import Input from '../input'

type Props = {
  onChange: (e: React.SyntheticEvent<HTMLInputElement>, key: string) => void;
  value: string;
}

const SlugInput = ({ onChange, value }: Props) => (
  <Input
    htmlFor="slug"
    type="text"
    label="slug"
    id="slug"
    value={value}
    onChange={e => onChange(e, 'slug')}
  />
)

export default SlugInput
