import routerx from 'express-promise-router'
import CategoryRouter from './category';
import ArticleRouter from './article'
import UserRouter from './user'
import PersonRouter from './person'
import EnterRouter from './enter'
import SaleRouter from './sale'

const router = routerx()

router.use('/category',CategoryRouter)
router.use('/article',ArticleRouter)
router.use('/user',UserRouter)
router.use('/person',PersonRouter)
router.use('/enter',EnterRouter)
router.use('/sale',SaleRouter)

export default router
