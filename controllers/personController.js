import models from '../models'

export default {
    add: async (req,res,next) => {
        try {
            const reg = await models.Person.create(req.body)
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
            const reg = await models.Person.findOne({_id: req.query._id})
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
            const reg = await models.Person.find({$or:[{'name': new RegExp(keyword,'i')},{'email': new RegExp(keyword,'i')}]},{createdAt:0}).sort(
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
    listClients: async (req,res,next) => {
        try {
            let keyword = req.query.keyword
            const reg = await models.Person.find({$or:[{'name': new RegExp(keyword,'i')},{'email': new RegExp(keyword,'i')}],'personType': 'Client'},{createdAt:0}).sort(
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
    listProviders: async (req,res,next) => {
        try {
            let keyword = req.query.keyword
            const reg = await models.Person.find({$or:[{'name': new RegExp(keyword,'i')},{'email': new RegExp(keyword,'i')}],'personType': 'Provider'},{createdAt:0}).sort(
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
            const reg = await models.Person.findByIdAndUpdate({_id: req.body._id},{
                personType: req.body.personType,
                name: req.body.name,
                documentType: req.body.documentType,
                documentNumber: req.body.documentNumber,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
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
            const reg = await models.Person.findByIdAndDelete({_id: req.query._id})
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
            const reg = await models.Person.findByIdAndUpdate({_id: req.body._id},{
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
            const reg = await models.Person.findByIdAndUpdate({_id: req.body._id},{
                status: 0
            })
            res.status(200).json(reg)
        }catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            })
            next(e)
        }
    }
}