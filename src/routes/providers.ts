import requireAuth from '../middlewares/requireAuth'
import requireAdmin from '../middlewares/requireAdmin'
import { Router } from 'express'
import { getProviders, newProvider, deleteProvider, updateProvider } from '../services/providerService'

const route = Router()

route.route('/')
  .get(requireAuth, requireAdmin, getProviders)
  .post(requireAuth, requireAdmin, newProvider)
route.route('/:id')
  .delete(requireAuth, requireAdmin, deleteProvider)
  .put(requireAuth, requireAdmin, updateProvider)
export default route
