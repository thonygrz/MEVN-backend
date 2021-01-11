import routerx from 'express-promise-router'
import SaleController from '../controllers/saleController'
import auth from '../middlewares/auth'

const router = routerx()

router.post('/add',auth.verifySeller,SaleController.add)
router.get('/query',auth.verifySeller,SaleController.query)
router.get('/list',auth.verifySeller,SaleController.list)
router.put('/activate',auth.verifySeller,SaleController.activate)
router.put('/deactivate',auth.verifySeller,SaleController.deactivate)
router.get('/lastYearGraph',auth.verifyUser,SaleController.lastYearGraph)
router.get('/getDates',auth.verifyUser,SaleController.getDates)

export default router

