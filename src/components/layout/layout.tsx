import * as React from 'react'
import styled from 'styled-components'
import { useLoadingRoute, Link } from 'react-navi'
import LoadingIndicator from '../loading-indicator/loading-indicator'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const Menu = styled.div`
  padding: 24px;
  > * {
    padding-right: 12px;
  }
`

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const loadingRoute = useLoadingRoute()

  return (
    <Wrapper>
      <LoadingIndicator show={!!loadingRoute} />
      <Menu>
        <Link href="/">Index</Link>
        <Link href="/create">Create</Link>
      </Menu>
      <Container>{children}</Container>
    </Wrapper>
  )
}

export default Layout
