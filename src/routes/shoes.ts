import requireAuth from '../middlewares/requireAuth'
import requireAdmin from '../middlewares/requireAdmin'
import { Router } from 'express'
import { getShoes, newShoe, deleteShoe, updateShoe, getShoesHome } from '../services/shoeService'

const router = Router()

router.route('/')
  .post(requireAuth, requireAdmin, newShoe)
  .get(requireAuth, requireAdmin, getShoes)

router.route('/:id')
  .delete(requireAuth, requireAdmin, deleteShoe)
  .put(requireAuth, requireAdmin, updateShoe)

router.get('/home', getShoesHome)

export default router
