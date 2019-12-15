import React, { useState, useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'
import ReactMarkdown from 'react-markdown'

import { Article, Track, Category, Artist, Tag } from '../../types'

import articles from '../../../mocks/articles.json'
import ArrayInput from './array-input'

interface Props {
  article?: Article
}

const SubList = ({ data }: { data: Set<any> }) => {
  const [list, setList] = useState([...data])

  useEffect(() => {
    setList([...data])
  }, [data])

  return (
    <ul>
      {list.map(el => (
        <li key={el}>{el}</li>
      ))}
    </ul>
  )
}

type Step = keyof Article

const initializeState = (state?: Article) => (
  prop: keyof Article,
  fallback: any
) => {
  if (!state) return fallback

  return state[prop] || fallback
}

const CreateForm = ({ article = articles[0] }: Props) => {
  const init = initializeState(article)
  const [path, setPath] = useState(init('path', ''))
  const [title, setTitle] = useState(init('title', ''))
  const [soundcloud, setSoundcloud] = useState(init('soundcloud', ''))
  const [content, setContent] = useState(init('content', ''))
  const [date, setDate] = useState(init('date', ''))
  const [number, setNumber] = useState(init('number', ''))
  const tagsRef = useRef<any>(null)
  // const [tags, setTags] = useState<Set<Tag>>(new Set(init('tags', [])))
  const [tags, setTags] = useState<Tag[]>(init('tags', []))
  const tracksRef = useRef<any>(null)
  const [tracks, setTracks] = useState<Track[]>([])
  const artistsRef = useRef<any>(null)
  const [artists, setArtists] = useState<Set<Artist>>(
    new Set(init('artists', []))
  )
  const categoriesRef = useRef<any>(null)
  const [categories, setCategories] = useState<Set<Category>>(
    new Set(init('categories', []))
  )
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write')

  const setter = useCallback(
    (e: React.SyntheticEvent<HTMLInputElement>, fn: (str: string) => void) => {
      fn(e.currentTarget.value)
    },
    []
  )

  const arraySetter = useCallback(
    (e: React.KeyboardEvent, type) => {
      switch (type) {
        // case 'tags': {
        //   if (e.keyCode === 13) {
        //     setTags(new Set([...tags, tagsRef.current.value]))
        //     tagsRef.current.value = ''
        //   }
        //   break
        // }
        case 'artists': {
          if (e.keyCode === 13) {
            setArtists(new Set([...artists, artistsRef.current.value]))
            artistsRef.current.value = ''
          }
          break
        }
        case 'categories': {
          if (e.keyCode === 13) {
            setCategories(new Set([...categories, categoriesRef.current.value]))
            categoriesRef.current.value = ''
          }
          break
        }
      }
    },
    [
      tags,
      setTags,
      tracks,
      setTracks,
      artists,
      setArtists,
      categories,
      setCategories,
    ]
  )

  return (
    <form style={{ marginTop: 24 }}>
      <div>
        <label htmlFor="path">url</label>
        <input
          type="text"
          id="path"
          onChange={e => setter(e, setPath)}
          value={path}
        />
      </div>
      <div>
        <label htmlFor="number">number</label>
        <input
          type="number"
          id="number"
          onChange={e => setter(e, setNumber)}
          value={number}
        />
      </div>
      <div>
        <label htmlFor="title">title</label>
        <input
          type="text"
          id="title"
          onChange={e => setter(e, setTitle)}
          value={title}
        />
      </div>
      <div>
        <label htmlFor="soundcloud">soundcloud</label>
        <input
          type="text"
          id="soundcloud"
          onChange={e => setter(e, setSoundcloud)}
          value={soundcloud}
        />
      </div>
      <div>
        <label htmlFor="date">date</label>
        <input
          type="text"
          id="date"
          onChange={e => setter(e, setDate)}
          value={date}
          placeholder="format: YYYY-MM-DD"
        />
      </div>
      <div>
        <label htmlFor="artists">artists</label>
        <input
          ref={artistsRef}
          type="text"
          id="artists"
          onKeyUp={e => arraySetter(e, 'artists')}
        />
        <div>
          <SubList data={artists} />
        </div>
      </div>
      <div>
        <label htmlFor="categories">categories</label>
        <input
          ref={categoriesRef}
          type="text"
          id="categories"
          onKeyUp={e => arraySetter(e, 'categories')}
        />
        <div>
          <SubList data={categories} />
        </div>
      </div>
      <div>
        <ArrayInput
          title="tags"
          id="tags"
          setNewValue={setTags}
          values={tags}
        />
      </div>
      {/* <div>
        <label htmlFor="tags">tags</label>
        <input
          ref={tagsRef}
          type="text"
          id="tags"
          onKeyUp={e => arraySetter(e, 'tags')}
        />
        <div>
          <SubList data={tags} />
        </div>
      </div> */}
      <div>
        <ReactMde
          value={content}
          onChange={setContent}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={markdown =>
            Promise.resolve(<ReactMarkdown source={markdown} />)
          }
        />
      </div>
    </form>
  )
}

export default CreateForm
