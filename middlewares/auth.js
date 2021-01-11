import tokenService from '../services/token'

export default {
    verifyUser: async (req,res,next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'No hay token'
            })
        }
        const user = await tokenService.decode(req.headers.token)
        if (user && user.role === 'Admin' || user.role === 'Storekeeper' || user.role === 'Seller') {
            next()
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            })
        }
    },
    verifyAdmin: async (req,res,next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'No hay token'
            })
        }
        const user = await tokenService.decode(req.headers.token)
        if (user && user.role === 'Admin') {
            next()
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            })
        }
    },
    verifyStorekeeper: async (req,res,next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'No hay token'
            })
        }
        const user = await tokenService.decode(req.headers.token)
        if (user && user.role === 'Admin' || user.role === 'Storekeeper') {
            next()
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            })
        }
    },
    verifySeller: async (req,res,next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'No hay token'
            })
        }
        const user = await tokenService.decode(req.headers.token)
        if (user && user.role === 'Admin' ||  user.role === 'Seller') {
            next()
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            })
        }
    },
}