import React from 'react'

import Input from '../input'

type Props = {
  onChange: (e: React.SyntheticEvent<HTMLInputElement>, key: string) => void;
  value: string;
}

const TitleInput = ({ onChange, value }: Props) => (
  <Input
    htmlFor="title"
    type="text"
    label="title"
    id="title"
    value={value}
    onChange={e => onChange(e, 'title')}
  />
)


export default TitleInput