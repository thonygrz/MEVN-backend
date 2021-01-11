import routerx from 'express-promise-router'
import ArticleController from '../controllers/articleController'
import auth from '../middlewares/auth'

const router = routerx()

router.post('/add',auth.verifyStorekeeper,ArticleController.add)
router.get('/query',auth.verifyStorekeeper,ArticleController.query)
router.get('/query',auth.verifyUser,ArticleController.queryBarCode)
router.get('/list',auth.verifyStorekeeper,ArticleController.list)
router.put('/update',auth.verifyStorekeeper,ArticleController.update)
router.delete('/remove',auth.verifyStorekeeper,ArticleController.remove)
router.put('/activate',auth.verifyStorekeeper,ArticleController.activate)
router.put('/deactivate',auth.verifyStorekeeper,ArticleController.deactivate)

export default router

