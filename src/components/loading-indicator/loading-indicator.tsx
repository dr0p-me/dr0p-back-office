import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import calculatePercent from './calculate-percent'

const LoadingContainer = styled.div`
  pointer-events: none;
  transition: 400ms linear all;
`
const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: none;
  width: 100%;
  height: 4px;
  background: #373759;
  border-radius: 0 1px 1px 0;
  transition: width 350ms;
`

const Peg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 70px;
  height: 2px;
  border-radius: 50%;
  opacity: 0.45;
  box-shadow: #373759 1px 0 6px 1px;
`

interface Props {
  show: boolean
}

const LoadingIndicator = ({ show }: Props) => {
  const [size, setSize] = useState(0)
  const [percent, setPercent] = useState(0)
  const [appearDelayWidth, setAppearDelayWidth] = useState(false)
  const [disappearDelayHide, setDisappearDelayHide] = useState(false)
  const [styles, setStyles] = useState({})

  // show
  useEffect(() => {
    if (show) {
      const newAppearDelayWidth = size === 0
      const newPercent = calculatePercent(percent)

      setPercent(newPercent)
      setSize(size + 1)
      setAppearDelayWidth(newAppearDelayWidth)
    }
  }, [show, size, setSize, percent, setPercent, setAppearDelayWidth])

  // hide
  useEffect(() => {
    if (!show) {
      const newSize = size - 1

      if (newSize < 0) {
        setSize(0)
        setPercent(0)
        const timer = setTimeout(() => {
          setDisappearDelayHide(false)
        }, 200)

        return () => clearTimeout(timer)
      }

      setSize(0)
      setDisappearDelayHide(true)
      setPercent(1)
    }
  }, [show, size, setSize, percent, setPercent, setDisappearDelayHide])

  useEffect(() => {
    setStyles({
      width: appearDelayWidth ? 0 : `${percent * 100}%`,
      display: disappearDelayHide || percent > 0 ? 'block' : 'none',
    })
  }, [percent, disappearDelayHide, appearDelayWidth])

  return (
    <LoadingContainer>
      <Bar style={styles}>
        <Peg />
      </Bar>
    </LoadingContainer>
  )
}

export default LoadingIndicator
