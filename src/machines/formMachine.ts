import { Machine, assign } from 'xstate'
import { Article, Track } from '../types'

export const TITLE = 'TITLE'
export const NUMBER = 'NUMBER'
export const DATE = 'DATE'
export const PATH = 'PATH'
export const ARTISTS = 'ARTISTS'
export const SOUNDCLOUD = 'SOUNDCLOUD'
export const TRACKLIST = 'TRACKLIST'
export const TAGS = 'TAGS'
export const CATEGORIES = 'CATEGORIES'
export const CONTENT = 'CONTENT'
export const IMAGE = 'IMAGE'
export const SLUG = 'SLUG'
export const PREVIEW = 'PREVIEW'
export const FINAL = 'FINAL'

export const FORM_MACHINE_NEXT = 'NEXT'
export const FORM_MACHINE_PREV = 'PREV'
export const FORM_MACHINE_START = 'START'
export const FORM_MACHINE_SET_VALUE = 'SET_VALUE'

interface FormState {
  states: {
    TITLE: {}
    NUMBER: {}
    DATE: {}
    PATH: {}
    ARTISTS: {}
    SOUNDCLOUD: {}
    TRACKLIST: {}
    TAGS: {}
    CATEGORIES: {}
    CONTENT: {}
    IMAGE: {}
    SLUG: {}
    PREVIEW: {}
    FINAL: {}
  }
}

type NextEvent = { type: 'NEXT' }
type PrevEvent = { type: 'PREV' }
type StartEvent = { type: 'START' }
type GoToTitleEvent = { type: 'GOTO_TITLE' }
type GoToNumberEvent = { type: 'GOTO_NUMBER' }
type GoToDateEvent = { type: 'GOTO_DATE' }
type GoToPathEvent = { type: 'GOTO_PATH' }
type GoToArtistsEvent = { type: 'GOTO_ARTISTS' }
type GoToSoundcloudEvent = { type: 'GOTO_SOUNDCLOUD' }
type GoToTracklistEvent = { type: 'GOTO_TRACKLIST' }
type GoToTagsEvent = { type: 'GOTO_TAGS' }
type GoToCategoriesEvent = { type: 'GOTO_CATEGORIES' }
type GoToContentEvent = { type: 'GOTO_CONTENT' }
type GoToImageEvent = { type: 'GOTO_IMAGE' }
type GoToSlugEvent = { type: 'GOTO_SLUG' }
type GoToPreviewEvent = { type: 'GOTO_PREVIEW' }
type SetValueEvent = { type: 'SET_VALUE'; key: keyof Article; payload: string | string[] | Track[] }

export type FormEvents =
  | NextEvent
  | PrevEvent
  | StartEvent
  | SetValueEvent
  | GoToTitleEvent
  | GoToNumberEvent
  | GoToDateEvent
  | GoToPathEvent
  | GoToArtistsEvent
  | GoToSoundcloudEvent
  | GoToTracklistEvent
  | GoToTagsEvent
  | GoToCategoriesEvent
  | GoToContentEvent
  | GoToImageEvent
  | GoToSlugEvent
  | GoToPreviewEvent

type FormContext = Article

const goToBuilder = () => ({
  GOTO_TITLE: TITLE,
  GOTO_NUMBER: NUMBER,
  GOTO_DATE: DATE,
  GOTO_PATH: PATH,
  GOTO_ARTISTS: ARTISTS,
  GOTO_SOUNDCLOUD: SOUNDCLOUD,
  GOTO_TRACKLIST: TRACKLIST,
  GOTO_TAGS: TAGS,
  GOTO_CATEGORIES: CATEGORIES,
  GOTO_CONTENT: CONTENT,
  GOTO_IMAGE: IMAGE,
  GOTO_SLUG: SLUG,
  GOTO_PREVIEW: PREVIEW,
})

const formMachine = Machine<FormContext, FormState, FormEvents>(
  {
    id: 'form',
    initial: TITLE,
    context: {
      slug: '',
      title: '',
      number: '',
      image: '',
      date: '',
      artists: [],
      tracklist: [],
      categories: [],
      tags: [],
      soundcloud: '',
      path: '',
      content: '',
    },
    states: {
      [TITLE]: {
        on: {
          NEXT: {
            target: NUMBER,
          },
          SET_VALUE: {
            actions: 'setValue',
          },
          ...goToBuilder(),
        },
      },
      [NUMBER]: {
        on: {
          NEXT: {
            target: IMAGE,
          },
          SET_VALUE: {
            actions: 'setValue',
          },
          PREV: TITLE,
          ...goToBuilder(),
        },
      },
      [IMAGE]: {
        on: {
          NEXT: {
            target: DATE,
          },
          SET_VALUE: {
            actions: 'setValue',
          },
          PREV: NUMBER,
          START: TITLE,
          ...goToBuilder(),
        },
      },
      [DATE]: {
        on: {
          NEXT: {
            target: ARTISTS,
          },
          SET_VALUE: {
            actions: 'setValue',
          },
          PREV: IMAGE,
          START: TITLE,
          ...goToBuilder(),
        },
      },
      [ARTISTS]: {
        on: {
          NEXT: {
            target: TRACKLIST,
          },
          SET_VALUE: {
            actions: 'setValue',
          },
          PREV: DATE,
          START: TITLE,
          ...goToBuilder(),
        },
      },
      [TRACKLIST]: {
        on: {
          NEXT: {
            target: CATEGORIES,
          },
          SET_VALUE: {
            actions: 'setValue',
          },
          PREV: ARTISTS,
          START: TITLE,
          ...goToBuilder(),
        },
      },
      [CATEGORIES]: {
        on: {
          NEXT: {
            target: TAGS,
          },
          SET_VALUE: {
            actions: 'setValue',
          },
          PREV: TRACKLIST,
          START: TITLE,
          ...goToBuilder(),
        },
      },
      [TAGS]: {
        on: {
          NEXT: {
            target: SOUNDCLOUD,
          },
          SET_VALUE: {
            actions: 'setValue',
          },
          PREV: CATEGORIES,
          START: TITLE,
          ...goToBuilder(),
        },
      },
      [SOUNDCLOUD]: {
        on: {
          NEXT: {
            target: PATH,
          },
          SET_VALUE: {
            actions: 'setValue',
          },
          PREV: TAGS,
          START: TITLE,
          ...goToBuilder(),
        },
      },
      [PATH]: {
        on: {
          NEXT: {
            target: CONTENT,
          },
          SET_VALUE: {
            actions: 'setValue',
          },
          PREV: SOUNDCLOUD,
          START: TITLE,
          ...goToBuilder(),
        },
      },
      [CONTENT]: {
        on: {
          NEXT: {
            target: SLUG,
          },
          SET_VALUE: {
            actions: 'setValue',
          },
          PREV: PATH,
          START: TITLE,
          ...goToBuilder(),
        },
      },
      [SLUG]: {
        on: {
          NEXT: {
            target: PREVIEW,
          },
          SET_VALUE: {
            actions: 'setValue',
          },
          PREV: CONTENT,
          START: TITLE,
          ...goToBuilder(),
        },
      },
      [PREVIEW]: {
        on: {
          NEXT: {
            target: FINAL,
          },
          PREV: SLUG,
          START: TITLE,
          ...goToBuilder(),
        },
      },
      [FINAL]: {
        type: 'final',
        entry: ['logArticle'],
      },
    },
  },
  {
    actions: {
      logArticle: context => console.log(context),
      setValue: assign((context: FormContext, event: FormEvents) =>
        event.type === FORM_MACHINE_SET_VALUE ? { [event.key]: event.payload } : {}
      ),
    },
  }
)

export default formMachine
