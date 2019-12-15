import { NowRequest, NowResponse } from '@now/node'
import fs from 'fs'

export default (req: NowRequest, res: NowResponse) =>
  res.send({ title: 'coucou' })
