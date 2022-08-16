import { Router } from 'express'
import { authenticateing } from '../../middlewares/Token_Authenticator.middleware'
import {
  index,
  create,
  show,
  update,
  _delete,
  insertOrderedProduct
} from '../../handlers/orders.handler'
const orderRouter = Router()
orderRouter.get('/', authenticateing, index)
orderRouter.get('/:id', authenticateing, show)
orderRouter.post('/', authenticateing, create)
orderRouter.put('/:id', authenticateing, update)
orderRouter.delete('/:id', authenticateing, _delete)
orderRouter.post('/:id/products', authenticateing, insertOrderedProduct)
export { orderRouter }
