import models from '../models'

async function increaseStock(articleId,quant) {
    let {stock} = await models.Article.findOne({_id: articleId})
    let newStock = parseInt(stock) + parseInt(quant)

    await models.Article.findByIdAndUpdate({_id: articleId},{stock: newStock})
}

async function decreaseStock(articleId,quant) {
    let {stock} = await models.Article.findOne({_id: articleId})
    let newStock = parseInt(stock) - parseInt(quant)

    await models.Article.findByIdAndUpdate({_id: articleId},{stock: newStock})
}

export default {
    add: async (req,res,next) => {
        try {
            console.log('ENTER BODY: ',req.body)
            const reg = await models.Enter.create(req.body)
            // Update stock
            let details = req.body.details
            details.map(d => increaseStock(d._id,d.quantity))
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
            let reg = await models.Enter.findOne({_id: req.query._id})

            if (!reg){
                res.status(404).send({
                    message: 'El registro no existe.'
                })
            }
            else {
                // Se vuelve a consultar con populate sabiendo que no dará error
                reg = (await models.Enter.findOne({_id: req.query._id}))
                .populate('user',{name:1})
                .populate('person',{name:1})
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
            const reg = await models.Enter.find({$or:[{'proofNumber': new RegExp(keyword,'i')},{'proofSeries': new RegExp(keyword,'i')}]})
            .populate('user',{name:1})
            .populate('person',{name:1})
            .sort(
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
    // update: async (req,res,next) => {
    //     try {
    //         const reg = await models.Category.findByIdAndUpdate({_id: req.body._id},{
    //             name: req.body.name,
    //             description: req.body.description
    //         })
    //         res.status(200).json(reg)
    //     }catch (e) {
    //         res.status(500).send({
    //             message: 'Ocurrió un error'
    //         })
    //         next(e)
    //     }
    // },
    // remove: async (req,res,next) => {
    //     try {
    //         const reg = await models.Category.findByIdAndDelete({_id: req.query._id})
    //         res.status(200).json(reg)
    //     }catch (e) {
    //         res.status(500).send({
    //             message: 'Ocurrió un error'
    //         })
    //         next(e)
    //     }
    // },
    activate: async (req,res,next) => {
        try {
            const reg = await models.Enter.findByIdAndUpdate({_id: req.body._id},{
                status: 1
            })
            // Update stock
            let details = reg.details
            details.map(d => increaseStock(d._id,d.quantity))
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
            const reg = await models.Enter.findByIdAndUpdate({_id: req.body._id},{
                status: 0
            })
            // Update stock
            let details = reg.details
            details.map(d => decreaseStock(d._id,d.quantity))
            res.status(200).json(reg)
        }catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            })
            next(e)
        }
    },
    lastYearGraph: async (req,res,next) => {
        try {
            const reg = await models.Enter.aggregate(
                [
                    {
                        $group: {
                            _id: {
                                month: {
                                    $month: "$createdAt"
                                },
                                year: {
                                    $year: "$createdAt"
                                }
                            },
                            total: {
                                $sum: "$total"
                            },
                            number: {
                                $sum: 1
                            }
                        },
                    },
                    {
                        $sort: {
                            "_id.year": -1,
                            "_id.month": -1
                        }
                    }
                ]
            ).limit(12)

            res.status(200).json(reg)
        }catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            })
            next(e)
        }
    },
    getDates: async (req,res,next) => {
        try {
            let start = req.query.start
            let end = req.query.end
            const reg = await models.Enter.find({"createdAt": {"$gte": start, "$lt": end}})
            .populate('user',{name:1})
            .populate('person',{name:1})
            .sort(
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
}