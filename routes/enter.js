import routerx from 'express-promise-router'
import EnterController from '../controllers/enterController'
import auth from '../middlewares/auth'

const router = routerx()

router.post('/add',auth.verifyStorekeeper,EnterController.add)
router.get('/query',auth.verifyStorekeeper,EnterController.query)
router.get('/list',auth.verifyStorekeeper,EnterController.list)
router.put('/activate',auth.verifyStorekeeper,EnterController.activate)
router.put('/deactivate',auth.verifyStorekeeper,EnterController.deactivate)
router.get('/lastYearGraph',auth.verifyUser,EnterController.lastYearGraph)
router.get('/getDates',auth.verifyUser,EnterController.getDates)

export default router

