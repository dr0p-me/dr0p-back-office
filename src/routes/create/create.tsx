import React from 'react'
import { mount, route } from 'navi'

import CreateForm from '../../components/form/article-form'

const Create = () => {
  return (
    <div>
      <h1>Create</h1>
      <CreateForm />
    </div>
  )
}

const create = mount({
  '/': route({
    title: 'Create New Post',
    view: <Create />,
  }),
})

export default create
