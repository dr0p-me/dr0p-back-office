import React from 'react'
import { useCurrentRoute } from 'react-navi'

const Index = () => {
  const { data } = useCurrentRoute()

  return data ? <h1>Status is {data.status}</h1> : <h1>Ko</h1>
}

export default Index
