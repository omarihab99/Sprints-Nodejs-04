const zod = require('zod');
const productValidate = (req, res, next) => {
  try{
    const productSchema = zod.object({
      id: zod.number(),
      name: zod.string(),
      image: zod.string(),
    });
    req.body = productSchema.parse(req.body);
    next();
  }
  catch(error){
    res.status(400).json(JSON.parse(error.message));
  }
}
module.exports = productValidate;