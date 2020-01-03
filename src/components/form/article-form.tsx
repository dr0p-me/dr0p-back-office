import React, { useState, useCallback } from 'react'
import { State } from 'xstate'
// import styled from 'styled-components'

import ReactMde from 'react-mde'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import 'react-mde/lib/styles/css/react-mde-all.css'

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
  TRACKLIST,
  CATEGORIES,
  PREVIEW,
  IMAGE,
  SOUNDCLOUD,
  FORM_MACHINE_NEXT,
  FORM_MACHINE_PREV,
  FORM_MACHINE_SET_VALUE,
  FormEvents,
} from '../../machines/formMachine'
import { Article, Track } from '../../types'

import TitleInput from './article-inputs/title-input'
import NumberInput from './article-inputs/number-input'
import DateInput from './article-inputs/date-input'
import ArtistsInput from './article-inputs/artists-input'
import CategoriesInput from './article-inputs/categories-input'
import TagsInput from './article-inputs/tags-input'
import SoundcloudInput from './article-inputs/soundcloud-input'
import PathInput from './article-inputs/path-input'
import SlugInput from './article-inputs/slug-input'
import TracklistInput from './article-inputs/tracklist-input'
import ImageInput from './article-inputs/image-input'
import Title from '../title'
import { Subtitle } from '../title'

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  align-self: stretch;
  margin: 0 24px 24px;
  /* border-radius: 24px;
  background-color: white;
  box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.05); */
`

interface Props {
  formContext: State<Article, FormEvents>
  dispatch: (obj: FormEvents) => void
  save: () => void
}

const ArticleForm = ({ dispatch, formContext, save }: Props) => {
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write')

  const onNext = useCallback(() => {
    dispatch({ type: FORM_MACHINE_NEXT })
  }, [])

  const onPrev = useCallback(() => {
    dispatch({ type: FORM_MACHINE_PREV })
  }, [])

  const onChange = useCallback((e: React.SyntheticEvent<HTMLInputElement>, type) => {
    dispatch({
      type: FORM_MACHINE_SET_VALUE,
      key: type,
      payload: e.currentTarget.value,
    })
  }, [])

  const onChangeContent = useCallback((e: string) => {
    dispatch({
      type: FORM_MACHINE_SET_VALUE,
      key: 'content',
      payload: e,
    })
  }, [])

  const onChangeArray = useCallback((value: string[] | Track[], type: keyof Article) => {
    dispatch({
      type: FORM_MACHINE_SET_VALUE,
      key: type,
      payload: value,
    })
  }, [])

  const onChangeImage = useCallback((imageUrl: string) => {
    dispatch({
      type: FORM_MACHINE_SET_VALUE,
      key: 'image',
      payload: imageUrl,
    })
  }, [])

  return (
    <Wrapper>
      <Title style={{ textAlign: 'center' }}>Create</Title>
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

      {formContext.matches(IMAGE) ? (
        <>
          <Subtitle>Cover</Subtitle>
          <ImageInput currentImage={formContext.context.image} onChangeImage={onChangeImage} />
        </>
      ) : null}

      {formContext.matches(TAGS) ? (
        <TagsInput
          setNewValue={val => onChangeArray(val, 'tags')}
          values={formContext.context.tags}
        />
      ) : null}

      {formContext.matches(SOUNDCLOUD) ? (
        <SoundcloudInput value={formContext.context.soundcloud} onChange={onChange} />
      ) : null}

      {formContext.matches(TRACKLIST) ? (
        <TracklistInput
          values={formContext.context.tracklist}
          setNewValue={val => onChangeArray(val, 'tracklist')}
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
          generateMarkdownPreview={markdown => Promise.resolve(<ReactMarkdown source={markdown} />)}
        />
      ) : null}

      {formContext.matches(SLUG) ? (
        <SlugInput value={formContext.context.slug} onChange={onChange} />
      ) : null}

      {formContext.matches(PREVIEW) ? <div>Preview</div> : null}

      {formContext.matches(FINAL) ? (
        <div>
          <button onClick={() => save()}>save</button>
        </div>
      ) : null}

      <footer>
        {formContext.matches(TITLE) ? <div /> : <button onClick={onPrev}>prev</button>}
        {formContext.matches(FINAL) ? <div /> : <button onClick={onNext}>next</button>}
      </footer>
    </Wrapper>
  )
}

export default ArticleForm
