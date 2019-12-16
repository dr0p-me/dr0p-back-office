import React, { useState, useCallback } from 'react'
import { State } from 'xstate'
// import styled from 'styled-components'

import ReactMde from 'react-mde'
import ReactMarkdown from 'react-markdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

// import articles from '../../../mocks/articles.json'
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
import { Article } from '../../types'

import TitleInput from './article-inputs/title-input'
import NumberInput from './article-inputs/number-input'
import DateInput from './article-inputs/date-input'
import ArtistsInput from './article-inputs/artists-input'
import CategoriesInput from './article-inputs/categories-input'
import TagsInput from './article-inputs/tags-input'
import SoundcloudInput from './article-inputs/soundcloud-input'
import PathInput from './article-inputs/path-input'
import SlugInput from './article-inputs/slug-input'

interface Props {
  formContext: State<Article, FormEvents>;
  dispatch: (obj: FormEvents) => void;
  save: () => void;
}

const ArticleForm = ({ dispatch, formContext, save }: Props) => {
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
        <TitleInput value={formContext.context.title} onChange={onChange} />
      ) : null}
      {formContext.matches(NUMBER) ? (
        <NumberInput value={formContext.context.number} onChange={onChange} />
      ) : null}
      {formContext.matches(DATE) ? (
        <DateInput value={formContext.context.date} onChange={onChange} />
      ) : null}
      {formContext.matches(ARTISTS) ? (
        <ArtistsInput
          setNewValue={val => onChangeArray(val, 'artists')}
          values={formContext.context.artists}
        />
      ) : null}
      {formContext.matches(CATEGORIES) ? (
        <CategoriesInput
          setNewValue={val => onChangeArray(val, 'categories')}
          values={formContext.context.categories}
        />
      ) : null}
      {formContext.matches(TAGS) ? (
        <TagsInput
          setNewValue={val => onChangeArray(val, 'tags')}
          values={formContext.context.tags}
        />
      ) : null}
      {formContext.matches(SOUNDCLOUD) ? (
        <SoundcloudInput
          value={formContext.context.soundcloud}
          onChange={onChange}
        />
      ) : null}
      {formContext.matches(PATH) ? (
        <PathInput value={formContext.context.path} onChange={onChange} />
      ) : null}
      {formContext.matches(CONTENT) ? (
        <ReactMde
          value={formContext.context.content}
          onChange={onChangeContent}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={markdown =>
            Promise.resolve(<ReactMarkdown source={markdown} />)
          }
        />
      ) : null}
      {formContext.matches(SLUG) ? (
        <SlugInput value={formContext.context.slug} onChange={onChange} />
      ) : null}
      {formContext.matches(FINAL) ? (
        <div>
          <button onClick={() => save()}>save</button>
        </div>
      ) : null}
      <footer>
        {formContext.matches(TITLE) ? (
          <div />
        ) : (
          <button onClick={onPrev}>prev</button>
        )}
        {formContext.matches(FINAL) ? (
          <div />
        ) : (
          <button onClick={onNext}>next</button>
        )}
        <button onClick={() => dispatch({ type: 'GOTO_TITLE' })}>title</button>
        <button onClick={() => dispatch({ type: 'GOTO_NUMBER' })}>number</button>
        <button onClick={() => dispatch({ type: 'GOTO_PATH' })}>path</button>
        <button onClick={() => dispatch({ type: 'GOTO_SLUG' })}>slug</button>
        <button onClick={() => dispatch({ type: 'GOTO_DATE' })}>date</button>
        <button onClick={() => dispatch({ type: 'GOTO_CATEGORIES' })}>categories</button>
        <button onClick={() => dispatch({ type: 'GOTO_ARTISTS' })}>artists</button>
        <button onClick={() => dispatch({ type: 'GOTO_TRACKLIST' })}>tracklist</button>
        <button onClick={() => dispatch({ type: 'GOTO_IMAGE' })}>image</button>
        <button onClick={() => dispatch({ type: 'GOTO_SOUNDCLOUD' })}>soundcloud</button>
        <button onClick={() => dispatch({ type: 'GOTO_CONTENT' })}>content</button>
        <button onClick={() => dispatch({ type: 'GOTO_TAGS' })}>tags</button>
      </footer>
    </div>
  )
}

export default ArticleForm
