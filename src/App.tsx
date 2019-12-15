import React, { Suspense } from 'react'
import { mount, route, lazy } from 'navi'
import { Router, View, NotFoundBoundary } from 'react-navi'

import Index from './routes/index'
import { FirebaseProvider } from './services/firebase'

import Layout from './components/layout/layout'
import GlobalStyle from './components/global-style/global-style'
import NotFound from './components/not-found/not-found'
import Fallback from './components/fallback/fallback'

const routes = mount({
  '/': route({
    title: 'Hello',
    getData: async () =>
      new Promise(res => {
        setTimeout(() => {
          res({ status: 'ok' })
        }, 500)
      }),
    view: <Index />,
  }),
  '/create': lazy(() => import('./routes/create/create')),
})

const App = () => {
  return (
    <FirebaseProvider>
      <Router routes={routes}>
        <GlobalStyle />
        <Layout>
          <NotFoundBoundary render={NotFound}>
            <Suspense fallback={<Fallback />}>
              <View />
            </Suspense>
          </NotFoundBoundary>
        </Layout>
      </Router>
    </FirebaseProvider>
  )
}

export default App
