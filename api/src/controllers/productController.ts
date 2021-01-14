/* eslint-disable camelcase */
import Product from '../models/Product'

const productController: any = {}

productController.getProduct = async (req: any, res: any) => {
  const { id } = req.params
  try {
    return res.json(await Product.findOne({ where: { id } }))
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

productController.listProducts = async (req: any, res: any) => {
  const producer_id = req.user.id
  try {
    return res.json(await Product.findAll({ where: { producer_id } }))
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

productController.addProduct = async (req: any, res: any) => {
  try {
    const productInfo = JSON.parse(req.body.product)
    const product = await Product.create({
      producer_id: productInfo.producer_id,
      name: productInfo.name,
      description: productInfo.description,
      stock: productInfo.stock,
      unit: productInfo.unit,
      category_id: productInfo.category,
      image: req.file == null ? null : req.file.buffer
    })
    return res.json(product)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

productController.updateProduct = async (req: any, res: any) => {
  console.log(req.body.product, 'update')
  const { id } = req.params
  const productInfo = JSON.parse(req.body.product)
  console.log(productInfo)
  try {
    const product = await Product.findOne({ where: { id } })
    // TODO: Ok to throw errors?
    if (!product) {
      throw new Error('Error: No product with id')
    }
    console.log(product)
    if (req.file) {
      product.setDataValue('name', productInfo.name)
      product.setDataValue('description', productInfo.description)
      product.setDataValue('stock', productInfo.stock)
      product.setDataValue('unit', productInfo.unit)
      product.setDataValue('category_id', productInfo.category)
      product.setDataValue('image', req.file.buffer)
    } else {
      product.setDataValue('name', productInfo.name)
      product.setDataValue('description', productInfo.description)
      product.setDataValue('stock', productInfo.stock)
      product.setDataValue('unit', productInfo.unit)
      product.setDataValue('category_id', productInfo.category)
    }
    await product.save()
    return res.json(product)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

productController.deleteProduct = async (req: any, res: any) => {
  const { id } = req.params
  try {
    const product = await Product.findOne({ where: { id } })
    // TODO: Ok to throw errors?
    if (!product) {
      throw new Error('Error: No product with id')
    }
    await product.destroy()
    return res.sendStatus(200)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

export default productController
