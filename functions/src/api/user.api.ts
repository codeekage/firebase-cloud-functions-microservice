import * as express from 'express'
import * as cors from 'cors'
import {
  currentUser,
  handleUserUpdate,
} from '../controllers/auth.handler'
export const service = express()

service.use(cors())


service.get('/profile', currentUser)
service.get('/update', handleUserUpdate)
