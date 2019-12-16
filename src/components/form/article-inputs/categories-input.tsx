import React from 'react'

import ArrayInput from '../array-input'

type Props = {
  setNewValue: (value: string[]) => void;
  values: string[];
}

const CategoriesInput = ({ setNewValue, values }: Props) => (
  <ArrayInput
    htmlFor="categories"
    label="categories"
    id="categories"
    values={values}
    setNewValue={setNewValue}
  />
)

export default CategoriesInput
