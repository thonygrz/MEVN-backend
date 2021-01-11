import models from '../models'
export default {
    add: async (req,res,next) => {
        try {
            console.log('req.body: ',req.body)
            const reg = await models.Category.create(req.body)
            res.status(200).json(reg)
        }catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            })
            next(e)
        }
    },
    query: async (req,res,next) => {
        try {
            const reg = await models.Category.findOne({_id: req.query._id})
            if (!reg){
                res.status(404).send({
                    message: 'El registro no existe.'
                })
            }
            else {
                res.status(200).json(reg)
            }
        }catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            })
            next(e)
        }
    },
    list: async (req,res,next) => {
        try {
            let keyword = req.query.keyword
            const reg = await models.Category.find({$or:[{'name': new RegExp(keyword,'i')},{'description': new RegExp(keyword,'i')}]},{createdAt:0}).sort(
                {
                    'createdAt': -1
                }
            )
            res.status(200).json(reg)
        }catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            })
            next(e)
        }
    },
    update: async (req,res,next) => {
        try {
            const reg = await models.Category.findByIdAndUpdate({_id: req.body._id},{
                name: req.body.name,
                description: req.body.description
            })
            res.status(200).json(reg)
        }catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            })
            next(e)
        }
    },
    remove: async (req,res,next) => {
        try {
            const reg = await models.Category.findByIdAndDelete({_id: req.query._id})
            res.status(200).json(reg)
        }catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            })
            next(e)
        }
    },
    activate: async (req,res,next) => {
        try {
            const reg = await models.Category.findByIdAndUpdate({_id: req.body._id},{
                status: 1
            })
            res.status(200).json(reg)
        }catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            })
            next(e)
        }
    },
    deactivate: async (req,res,next) => {
        try {
            const reg = await models.Category.findByIdAndUpdate({_id: req.body._id},{
                status: 0
            })
            res.status(200).json(reg)
        }catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            })
            next(e)
        }
    },
}