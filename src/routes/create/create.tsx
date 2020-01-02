import React from 'react'
import { mount, route } from 'navi'
import { useMachine } from '@xstate/react'
import styled from 'styled-components'

import { useFirebase } from '../../services/firebase'
import formMachine from '../../machines/formMachine'

import ArticleForm from '../../components/form/article-form'
import articles from './../../../mocks/articles.json'

const Container = styled.div`
  flex: 1;
  display: flex;
  align-self: stretch;
  flex-direction: column;
  align-items: center;
  background-color: #e9225e;
  padding: 24px;
`

const Create = () => {
  const firebase = useFirebase()
  const [formState, sendToMachine] = useMachine(formMachine, { context: articles[0] })

  const save = async () => {
    try {
      await firebase
        .firestore()
        .collection('articles')
        .doc(formState.context.slug)
        .set(formState.context)
      console.log('created article')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container>
      <h1>Create</h1>
      <ArticleForm dispatch={sendToMachine} formContext={formState} save={save} />
    </Container>
  )
}

const create = mount({
  '/': route({
    title: 'Create New Post',
    view: <Create />,
  }),
})

export default create
