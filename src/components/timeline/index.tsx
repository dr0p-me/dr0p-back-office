import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'

import { FormEvents, machineStates } from '../../machines/formMachine'

const indexToPercent = (index: number, itemsLength: number): number =>
  100 - (100 / (itemsLength - 1)) * index

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
  position: relative;
  margin-right: 80px;
`

const Bar = styled.div<{ start: number; position?: number }>`
  flex-grow: 1;
  width: 1px;
  position: absolute;
  top: ${p => p.start || 0}%;
  bottom: ${p => p.start || 0}%;
  background-color: #b2b2c0;

  &:after {
    content: '';
    display: block;
    position: absolute;
    transition: bottom 250ms ease-out;
    top: 0%;
    bottom: ${p => p.position || p.start || 0}%;
    background-color: #6988ff;
    z-index: 2;
    width: 1px;
  }
`

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  z-index: 3;
  position: relative;
  cursor: pointer;
`

const Item = styled.div<{ active: boolean }>`
  width: 9px;
  height: 9px;
  border-radius: 9px;
  background-color: ${p => (p.active ? '#6988ff' : '#b2b2c0;')};
  transition: background-color 150ms ease-out;
  transition-delay: ${p => (p.active ? '250ms' : '0ms')};
`

const ItemName = styled.span<{ active: boolean }>`
  position: absolute;
  left: calc(100% + 12px);
  color: ${p => (p.active ? '#6988ff' : '#b2b2c0;')};
  font-size: 12px;
  transition: color 250ms ease-out;
  transition-delay: ${p => (p.active ? '250ms' : '0ms')};
`

const TimelineItem = ({
  active,
  onClick,
  name,
}: {
  active: boolean
  onClick: (name: string) => void
  name: string
}) => {
  const [first, ...rest] = name.split('')
  return (
    <ItemWrapper onClick={() => onClick(name)}>
      <Item active={active} />
      <ItemName active={active}>{`${first}${rest.map(el => el.toLowerCase()).join('')}`}</ItemName>
    </ItemWrapper>
  )
}

type Props = {
  dispatch: (obj: FormEvents) => void
  active: string
}

const Timeline = ({ dispatch, active }: Props) => {
  const keys = useMemo(() => machineStates, [])
  const keyLength = machineStates.length
  const start = 100 / keyLength / 2
  const index = keys.findIndex(key => key === active)
  const position = index > -1 ? indexToPercent(index, keyLength) : undefined

  const jumpTo = useCallback(
    (type: string) => {
      // @ts-ignore
      dispatch({ type: `GOTO_${type}` })
    },
    [keys]
  )

  return (
    <Wrapper>
      {keys.map((key, i) => (
        <TimelineItem key={key} active={i <= index} name={key} onClick={jumpTo} />
      ))}
      <Bar start={start} position={position} />
    </Wrapper>
  )
}

export default Timeline
