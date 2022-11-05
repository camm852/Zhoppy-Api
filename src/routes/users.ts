import requireAuth from '../middlewares/requireAuth'
import requireAdmin from '../middlewares/requireAdmin'
import { Router } from 'express'
import { getUsers, login, signUp, updateInfo } from '../services/userService'

const route = Router()

route.route('/').post(signUp).get(requireAuth, requireAdmin, getUsers)
route.post('/login', login)
route.put('/profile', requireAuth, updateInfo)

export default route
