import { Router } from 'express'
import { authenticateing } from '../../middlewares/Token_Authenticator.middleware'
import { index, create, show, update, _delete } from '../../handlers/products.handler'
const productRouter = Router()
productRouter.get('/', authenticateing, index)
productRouter.get('/:id', authenticateing, show)
productRouter.post('/', authenticateing, create)
productRouter.put('/:id', authenticateing, update)
productRouter.delete('/:id', authenticateing, _delete)
export { productRouter }
