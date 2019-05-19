import * as express from 'express'
import * as cors from 'cors'
import {
  currentUser,
  handleUserUpdate,
  handleLogin,
  handleLogout,
} from '../controllers/auth.handler'
export const service = express()

service.use(cors())


service.post('/login', handleLogin)
service.get('/profile', currentUser)
service.get('/update', handleUserUpdate)
service.get('/logout', handleLogout)
