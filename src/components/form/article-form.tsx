import React, { useState, useCallback } from 'react'
import { State } from 'xstate'
// import styled from 'styled-components'

import ReactMde from 'react-mde'
import ReactMarkdown from 'react-markdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

// import articles from '../../../mocks/articles.json'
import { Article } from '../../types'
import ArrayInput from './array-input'
import Input from './input'

import {
  DATE,
  PATH,
  TAGS,
  SLUG,
  FINAL,
  TITLE,
  NUMBER,
  CONTENT,
  ARTISTS,
  CATEGORIES,
  SOUNDCLOUD,
  FORM_MACHINE_NEXT,
  FORM_MACHINE_PREV,
  FORM_MACHINE_SET_VALUE,
  FormEvents,
} from '../../machines/formMachine'

interface Props {
  formContext: State<Article, FormEvents>;
  dispatch: (obj: FormEvents) => void;
  save: () => void;
}

const ArticleForm = ({ dispatch, formContext, save }: Props) => {
  // const [formContext, dispatch] = useMachine(formMachine, { context: article })
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write')

  const onNext = useCallback(
    () => {
      dispatch({ type: FORM_MACHINE_NEXT})
    },
    [dispatch]
  )

  const onPrev = useCallback(
    () => {
      dispatch({type:FORM_MACHINE_PREV})
    },
    [dispatch]
  )

  const onChange = useCallback(
    (e: React.SyntheticEvent<HTMLInputElement>, type) => {
      dispatch({
        type: FORM_MACHINE_SET_VALUE,
        key: type,
        payload: e.currentTarget.value,
      })
    },
    [dispatch]
  )

  const onChangeContent = useCallback(
    (e: string) => {
      dispatch({
        type: FORM_MACHINE_SET_VALUE,
        key: 'content',
        payload: e,
      })
    },
    [dispatch]
  )

  const onChangeArray = useCallback(
    (value: string[], type: keyof Article) => {
      dispatch({
        type: FORM_MACHINE_SET_VALUE,
        key: type,
        payload: value,
      })
    },
    [dispatch]
  )

  return (
    <div style={{ flex: 1, width: '100%' }}>
      {formContext.matches(TITLE) ? (
        <>
          <Input
            htmlFor="title"
            type="text"
            label="title"
            id="title"
            onChange={(e: React.SyntheticEvent<HTMLInputElement>) =>
              onChange(e, 'title')
            }
            value={formContext.context.title}
          />
          <button onClick={onNext}>next</button>
        </>
      ) : null}
      {formContext.matches(NUMBER) ? (
        <>
          <Input
            htmlFor="number"
            type="number"
            label="number"
            id="number"
            onChange={(e: React.SyntheticEvent<HTMLInputElement>) =>
              onChange(e, 'number')
            }
            value={formContext.context.number}
          />
          <button onClick={onNext}>next</button>
          <button onClick={onPrev}>prev</button>
        </>
      ) : null}
      {formContext.matches(DATE) ? (
        <div>
          <Input
            htmlFor="date"
            type="date"
            label="date"
            id="date"
            onChange={(e: React.SyntheticEvent<HTMLInputElement>) =>
              onChange(e, 'date')
            }
            value={formContext.context.date}
          />
          <button onClick={onNext}>next</button>
          <button onClick={onPrev}>prev</button>
        </div>
      ) : null}
      {formContext.matches(ARTISTS) ? (
        <div>
          <ArrayInput
            title="artists"
            id="artists"
            setNewValue={val => onChangeArray(val, 'artists')}
            values={formContext.context.artists}
          />

          <button onClick={onNext}>next</button>
          <button onClick={onPrev}>prev</button>
        </div>
      ) : null}
      {formContext.matches(CATEGORIES) ? (
        <div>
          <ArrayInput
            title="categories"
            id="categories"
            setNewValue={val => onChangeArray(val, 'categories')}
            values={formContext.context.categories}
          />

          <button onClick={onNext}>next</button>
          <button onClick={onPrev}>prev</button>
        </div>
      ) : null}
      {formContext.matches(TAGS) ? (
        <div>
          <ArrayInput
            title="tags"
            id="tags"
            setNewValue={val => onChangeArray(val, 'tags')}
            values={formContext.context.tags}
          />

          <button onClick={onNext}>next</button>
          <button onClick={onPrev}>prev</button>
        </div>
      ) : null}
      {formContext.matches(SOUNDCLOUD) ? (
        <div>
          <label htmlFor="soundcloud">soundcloud iframe url</label>
          <input
            type="text"
            id="soundcloud"
            onChange={e => onChange(e, 'soundcloud')}
            value={formContext.context.soundcloud}
          />
          <button onClick={onNext}>next</button>
          <button onClick={onPrev}>prev</button>
        </div>
      ) : null}
      {formContext.matches(PATH) ? (
        <div>
          <label htmlFor="path">path</label>
          <input
            type="text"
            id="path"
            onChange={e => onChange(e, 'path')}
            value={formContext.context.path}
          />
          <button onClick={onNext}>next</button>
          <button onClick={onPrev}>prev</button>
        </div>
      ) : null}
      {formContext.matches(CONTENT) ? (
        <div>
          <ReactMde
            value={formContext.context.content}
            onChange={onChangeContent}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={markdown =>
              Promise.resolve(<ReactMarkdown source={markdown} />)
            }
          />
          <button onClick={onNext}>next</button>
          <button onClick={onPrev}>prev</button>
        </div>
      ) : null}
      {formContext.matches(SLUG) ? (
        <div>
          <label htmlFor="slug">slug</label>
          <input
            type="text"
            id="slug"
            onChange={e => onChange(e, 'slug')}
            value={formContext.context.slug}
          />
          <button onClick={onNext}>next</button>
          <button onClick={onPrev}>prev</button>
        </div>
      ) : null}
      {formContext.matches(FINAL) ? (
        <div>
          <button onClick={() => save()}>save</button>
        </div>
      ) : null}
    </div>
  )
}

export default ArticleForm
