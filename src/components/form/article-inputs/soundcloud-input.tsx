import React from 'react'

import Input from '../input'

type Props = {
  onChange: (e: React.SyntheticEvent<HTMLInputElement>, key: string) => void;
  value: string;
}

const SoundcloudInput = ({ onChange, value }: Props) => (
  <Input
    htmlFor="soundcloud"
    type="text"
    label="soundcloud"
    id="soundcloud"
    value={value}
    onChange={e => onChange(e, 'soundcloud')}
  />
)

export default SoundcloudInput
