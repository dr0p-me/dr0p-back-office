import React from 'react'

import ArrayInput from '../array-input'

type Props = {
  setNewValue: (value: string[]) => void;
  values: string[];
}

const TagsInput = ({ setNewValue, values }: Props) => (
  <ArrayInput
    htmlFor="tags"
    label="tags"
    id="tags"
    values={values}
    setNewValue={setNewValue}
  />
)

export default TagsInput
