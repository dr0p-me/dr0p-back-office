import {} from 'react-dom/experimental'
import * as React from 'react'
import ReactDom from 'react-dom'

import App from './App'

const root = document.getElementById('main') as HTMLElement
ReactDom.createRoot(root).render(<App />)
