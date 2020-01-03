import * as React from 'react'
import styled from 'styled-components'
import { useLoadingRoute } from 'react-navi'
import LoadingIndicator from '../loading-indicator/loading-indicator'

import '../../global.css'
import Menu from '../menu'

const Wrapper = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  font-family: Inter;
  background-color: #fafbfd;
`

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const loadingRoute = useLoadingRoute()

  return (
    <Wrapper>
      <LoadingIndicator show={!!loadingRoute} />
      <Menu />
      <Container>{children}</Container>
    </Wrapper>
  )
}

export default Layout
