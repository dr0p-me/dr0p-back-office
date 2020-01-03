import React, { useState, useReducer, useCallback, useEffect } from 'react'

import { Track, Artist } from '../../../types'
import ArrayInput from '../array-input'
import Input from '../input'

type TracksState = {
  tracks: Track[]
  currentTitle: string
  currentArtists: Artist[]
  currentMashupTitle: string
  currentMashupArtists: Artist[]
  mashups: Track[]
}

type InitTracksAction = { type: 'INIT_TRACKS'; tracks: Track[] }
type AddTrackAction = { type: 'ADD_TRACK'; track: Track }
type AddMashupAction = { type: 'ADD_MASHUP'; mashup: Track }
type ChangeCurrentTitleAction = { type: 'CHANGE_CURRENT_TITLE'; title: string }
type ChangeCurrentArtistsAction = {
  type: 'CHANGE_CURRENT_ARTISTS'
  artists: Artist[]
}
type ChangeCurrentMashupTitleAction = {
  type: 'CHANGE_CURRENT_MASHUP_TITLE'
  title: string
}
type ChangeCurrentMashupArtistsAction = {
  type: 'CHANGE_CURRENT_MASHUP_ARTISTS'
  artists: Artist[]
}

type Actions =
  | InitTracksAction
  | AddTrackAction
  | AddMashupAction
  | ChangeCurrentTitleAction
  | ChangeCurrentArtistsAction
  | ChangeCurrentMashupTitleAction
  | ChangeCurrentMashupArtistsAction

const initialState: TracksState = {
  tracks: [],
  currentTitle: '',
  currentArtists: [],
  currentMashupTitle: '',
  currentMashupArtists: [],
  mashups: [],
}

const tracksReducer = (state: TracksState, action: Actions): TracksState => {
  console.log()
  switch (action.type) {
    case 'INIT_TRACKS': {
      return {
        ...state,
        tracks: action.tracks,
      }
    }
    case 'ADD_TRACK': {
      return {
        ...initialState,
        tracks: [...new Set([...state.tracks, action.track])],
      }
    }
    case 'ADD_MASHUP': {
      return {
        ...state,
        currentMashupArtists: [],
        currentMashupTitle: '',
        mashups: [...new Set([...state.mashups, action.mashup])],
      }
    }
    case 'CHANGE_CURRENT_TITLE': {
      return {
        ...state,
        currentTitle: action.title,
      }
    }
    case 'CHANGE_CURRENT_ARTISTS': {
      return {
        ...state,
        currentArtists: action.artists,
      }
    }
    case 'CHANGE_CURRENT_MASHUP_TITLE': {
      return {
        ...state,
        currentMashupTitle: action.title,
      }
    }
    case 'CHANGE_CURRENT_MASHUP_ARTISTS': {
      return {
        ...state,
        currentMashupArtists: action.artists,
      }
    }
    default:
      return state
  }
}

type CurrentTrackDisplayProps = Track

const CurrentTrackDisplay = ({ name, artists, mashup }: CurrentTrackDisplayProps) => {
  return (
    <>
      {name ? <h2>Title:{name}</h2> : null}
      {artists.length ? <h2>Artists:{artists.join(', ')}</h2> : null}
      {mashup.length
        ? mashup.map(t => (
            <div key={t.name}>
              <h2>Mashups:</h2>
              <div style={{ marginLeft: 30 }}>
                <h3>Title:{t.name}</h3>
                <h3>Artists:{t.artists.join(', ')}</h3>
              </div>
            </div>
          ))
        : null}
    </>
  )
}

type CurrentTrackListDisplayProps = {
  tracks: Track[]
}

const CurrentTrackListDisplay = ({ tracks }: CurrentTrackListDisplayProps) => (
  <>
    {tracks.map((track, i) => (
      <div key={track.name}>
        <h3>Track: {i}</h3>
        <CurrentTrackDisplay {...track} />
      </div>
    ))}
  </>
)

type TracklistProps = {
  values?: Track[]
  setNewValue: (tracks: Track[]) => void
}

const TracklistInput = ({ values = [], setNewValue }: TracklistProps) => {
  const [hasMashup, setHasMashup] = useState(false)
  const [state, dispatch] = useReducer(tracksReducer, initialState, init => ({
    ...init,
    tracks: values,
  }))

  const onAddTrack = useCallback(() => {
    if (!state.currentArtists.length || !state.currentTitle) return

    const track: Track = {
      name: state.currentTitle,
      artists: state.currentArtists,
      mashup: state.mashups,
    }
    setHasMashup(false)
    dispatch({ type: 'ADD_TRACK', track })
  }, [state])

  const onAddToMashup = useCallback(() => {
    if (!state.currentMashupArtists.length || !state.currentMashupTitle) return
    const mashup: Track = {
      name: state.currentMashupTitle,
      artists: state.currentMashupArtists,
      mashup: [],
    }
    dispatch({ type: 'ADD_MASHUP', mashup })
  }, [state])

  useEffect(() => {
    setNewValue(state.tracks)
  }, [state.tracks])

  return (
    <>
      <Input
        type="text"
        id="current-track-title"
        htmlFor="current-track-title"
        label="title"
        value={state.currentTitle}
        onChange={e =>
          dispatch({
            type: 'CHANGE_CURRENT_TITLE',
            title: e.currentTarget.value,
          })
        }
      />
      <ArrayInput
        id="current-track-artist"
        htmlFor="current-track-artists"
        label="artists"
        values={state.currentArtists}
        setNewValue={(artists: Artist[]) => dispatch({ type: 'CHANGE_CURRENT_ARTISTS', artists })}
      />
      {hasMashup ? (
        <div style={{ maxWidth: '80%' }}>
          <h2>Mashup with song:</h2>
          <Input
            type="text"
            id="current-mashup-title"
            htmlFor="current-mashup-title"
            label="title"
            value={state.currentMashupTitle}
            onChange={e =>
              dispatch({
                type: 'CHANGE_CURRENT_MASHUP_TITLE',
                title: e.currentTarget.value,
              })
            }
          />
          <ArrayInput
            id="current-mashup-artist"
            htmlFor="current-mashup-artists"
            label="artists"
            values={state.currentMashupArtists}
            setNewValue={(artists: Artist[]) =>
              dispatch({ type: 'CHANGE_CURRENT_MASHUP_ARTISTS', artists })
            }
          />
          <button
            onClick={onAddToMashup}
            disabled={!state.currentMashupArtists.length || !state.currentMashupTitle}
          >
            Add Mashup
          </button>
        </div>
      ) : null}
      {!hasMashup ? <button onClick={() => setHasMashup(true)}>Mashup</button> : null}
      <div>
        <button onClick={onAddTrack} disabled={!state.currentArtists.length || !state.currentTitle}>
          Add Track
        </button>
      </div>
      {state.mashups.length ? (
        <div>
          Current Track Mashups
          <CurrentTrackDisplay
            name={state.currentMashupTitle}
            artists={state.currentMashupArtists}
            mashup={state.mashups}
          />
        </div>
      ) : null}
      <div style={{ color: 'white' }}>
        <CurrentTrackListDisplay tracks={state.tracks} />
      </div>
    </>
  )
}

export default TracklistInput
