import * as express from 'express'
import * as cors from 'cors'
import {
  handleSignUp,
  handleAsyncLogin,
  handleAsyncLogout,
} from '../controllers/auth.handler'
export const service = express()

service.use(cors())

service.post('/signup', handleSignUp)
service.post('/login', handleAsyncLogin)
service.get('/logout', handleAsyncLogout)
