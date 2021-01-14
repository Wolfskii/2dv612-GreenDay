/* eslint-disable camelcase */
import { Op } from 'sequelize'
import sequelize from '../db'
import Listing from '../models/Listing'
import Product from '../models/Product'
import Producer from '../models/Producer'

const searchController: any = {}

searchController.list = async (req: any, res: any) => {
  try {
    const query = await req.params.query
    const listings = await Listing.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: '%' + query + '%' } },
          { description: { [Op.like]: '%' + query + '%' } }
        ]
      },
      include: [{ model: Product }, { model: Producer }]
    })

    const producerNames = await sequelize.query('SELECT * FROM Producer WHERE (name LIKE \'%' + query + '%\') OR (description LIKE \'%' + query + '%\')')
    const categoryNames = await sequelize.query('SELECT * FROM Category WHERE (name LIKE \'%' + query + '%\') OR (description LIKE \'%' + query + '%\')')
    const result = {
      listings: listings,
      producerNames: producerNames[0],
      categoryNames: categoryNames[0]
    }
    return res.json(result)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

searchController.listProducer = async (req: any, res: any) => {
  try {
    const id = await req.params.id
    const producerInfo = await sequelize.query('SELECT * FROM Producer WHERE producer_id = ' + id)
    const producerListings = await sequelize.query('SELECT Listing.id, Listing.producer_id, Listing.product_id, Listing.title, Listing.description, Listing.price_per_unit, Listing.min_quantity, Listing.delivery_method, Product.image FROM Listing INNER JOIN Product ON Listing.product_id=Product.id WHERE Listing.producer_id = ' + id)
    const producerItem = {
      producerInfo: producerInfo[0],
      producerListings: producerListings[0]
    }
    return res.json(producerItem)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

export default searchController
