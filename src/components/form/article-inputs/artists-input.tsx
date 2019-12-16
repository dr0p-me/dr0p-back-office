import React from 'react'

import ArrayInput from '../array-input'

type Props = {
  setNewValue: (value: string[]) => void;
  values: string[];
}

const ArtistsInput = ({ setNewValue, values }: Props) => (
  <ArrayInput
    htmlFor="artists"
    label="artists"
    id="artists"
    values={values}
    setNewValue={setNewValue}
  />
)

export default ArtistsInput
