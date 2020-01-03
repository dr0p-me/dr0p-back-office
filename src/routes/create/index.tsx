import React from 'react'
import { mount, route } from 'navi'
import { useMachine } from '@xstate/react'
import styled from 'styled-components'

import { useFirebase } from '../../services/firebase'
import formMachine from '../../machines/formMachine'

import ArticleForm from '../../components/form/article-form'
import Timeline from '../../components/timeline'
import articles from '../../../mocks/articles.json'

const Container = styled.div`
  flex: 1;
  display: flex;
  align-self: stretch;
  flex-direction: row;
  align-items: center;
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
      <Timeline dispatch={sendToMachine} active={formState.value as string} />
      <ArticleForm dispatch={sendToMachine} formContext={formState} save={save} />
    </Container>
  )
}

const create = mount({
  '/': route({
    title: 'Create New Post',
    getData: async () =>
      new Promise(resolve => {
        setTimeout(() => resolve({}), 500)
      }),
    view: <Create />,
  }),
})

export default create
