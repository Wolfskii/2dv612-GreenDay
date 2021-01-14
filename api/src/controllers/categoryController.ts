import Category from '../models/Category'

const categoryController: any = {}

categoryController.getCategory = async (req: any, res: any) => {
  const { id } = req.params
  try {
    return res.json(await Category.findOne({ where: { id } }))
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

categoryController.listCategories = async (req: any, res: any) => {
  try {
    return res.json(await Category.findAll())
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

categoryController.addCategory = async (req: any, res: any) => {
  const { name, description } = req.body
  try {
    const category = await Category.create({
      name,
      description
    })
    return res.json(category)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

categoryController.updateCategory = async (req: any, res: any) => {
  const { id } = req.params
  const { name, description } = req.body
  try {
    const category = await Category.findOne({ where: { id } })
    // TODO: Ok to throw errors?
    if (!category) {
      throw new Error('Error: No category with id')
    }
    category.setDataValue('name', name)
    category.setDataValue('description', description)
    await category.save()
    return res.json(category)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

categoryController.deleteCategory = async (req: any, res: any) => {
  const { id } = req.params
  try {
    const category = await Category.findOne({ where: { id } })
    // TODO: Ok to throw errors?
    if (!category) {
      throw new Error('Error: No category with id')
    }
    await category.destroy()
    return res.sendStatus(200)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

export default categoryController
