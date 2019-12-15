import { Machine, assign } from 'xstate'
import { Article } from '../types'

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
export const FINAL = 'FINAL'

export const FORM_MACHINE_NEXT = 'NEXT'
export const FORM_MACHINE_PREV = 'PREV'
export const FORM_MACHINE_START = 'START'
export const FORM_MACHINE_SET_VALUE = 'SET_VALUE'

interface FormState {
  states: {
    TITLE: {};
    NUMBER: {};
    DATE: {};
    PATH: {};
    ARTISTS: {};
    SOUNDCLOUD: {};
    TRACKLIST: {};
    TAGS: {};
    CATEGORIES: {};
    CONTENT: {};
    IMAGE: {};
    SLUG: {};
    FINAL: {};
  };
}

type NextEvent = { type: 'NEXT' }
type PrevEvent = { type: 'PREV' }
type StartEvent = { type: 'START' }
type SetValueEvent = { type: 'SET_VALUE'; key: keyof Article; payload: string | string[] }

export type FormEvents = NextEvent | PrevEvent | StartEvent | SetValueEvent

type FormContext = Article

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
        },
      },
      [NUMBER]: {
        on: {
          NEXT: {
            target: DATE, // TODO: GO TO IMAGE
          },
          SET_VALUE: {
            actions: 'setValue',
          },
          PREV: TITLE,
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
          PREV: NUMBER, // TODO: GO TO IMAGE
          START: TITLE,
        },
      },
      [ARTISTS]: {
        on: {
          NEXT: {
            target: CATEGORIES, // TODO: GO TO TRACKLIST
          },
          SET_VALUE: {
            actions: 'setValue',
          },
          PREV: DATE,
          START: TITLE,
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
          PREV: ARTISTS, // TODO: GO TO TRACKLIST
          START: TITLE,
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
        },
      },
      [SLUG]: {
        on: {
          NEXT: {
            target: FINAL,
          },
          SET_VALUE: {
            actions: 'setValue',
          },
          PREV: CONTENT,
          START: TITLE,
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
        event.type === FORM_MACHINE_SET_VALUE
          ? { [event.key]: event.payload }
          : {}
      ),
    },
  }
)

export default formMachine
