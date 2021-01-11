import models from "../models";
export default {
  add: async (req, res, next) => {
    try {
      console.log("req.body: ", req.body);
      const reg = await models.Article.create(req.body);
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.Article.findOne({
        code: req.query.code,
      }).populate("category", { name: 1 });
      if (!reg) {
        res.status(400).send({
          message: "El registro no existe.",
        });
      } else {
        res.status(200).json(reg);
      }
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  queryBarCode: async (req, res, next) => {
    try {
      const reg = await models.Article.findOne({
        _id: req.query.barCode,
      }).populate("category", { name: 1 });
      if (!reg) {
        res.status(404).send({
          message: "El registro no existe.",
        });
      } else {
        res.status(200).json(reg);
      }
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  list: async (req, res, next) => {
    try {
      let keyword = req.query.keyword;
      const reg = await models.Article.find(
        {
          $or: [
            { name: new RegExp(keyword, "i") },
            { description: new RegExp(keyword, "i") },
          ],
        },
        { createdAt: 0 }
      )
        .populate("category", { name: 1 })
        .sort({
          createdAt: -1,
        });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const reg = await models.Article.findByIdAndUpdate(
        { _id: req.body._id },
        {
          category: req.body.category,
          code: req.body.code,
          name: req.body.name,
          description: req.body.description,
          sellingPrice: req.body.sellingPrice,
          stock: req.body.stock,
        }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  remove: async (req, res, next) => {
    try {
      const reg = await models.Article.findByIdAndDelete({
        _id: req.query._id,
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  activate: async (req, res, next) => {
    try {
      const reg = await models.Article.findByIdAndUpdate(
        { _id: req.body._id },
        {
          status: 1,
        }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  deactivate: async (req, res, next) => {
    try {
      const reg = await models.Article.findByIdAndUpdate(
        { _id: req.body._id },
        {
          status: 0,
        }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
};
