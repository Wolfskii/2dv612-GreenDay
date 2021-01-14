/* eslint-disable camelcase */
import Listing from '../models/Listing'
import Product from '../models/Product'
import Producer from '../models/Producer'

const listingController: any = {}

// List all listings
listingController.listAllListings = async (req: any, res: any) => {
  try {
    const listings = await Listing.findAll({ include: [{ model: Product }, { model: Producer }] })
    return res.json(listings)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

// List latest listings
listingController.listLatestListings = async (req: any, res: any) => {
  try {
    const listings = await Listing.findAll({
      include: [{ model: Product }, { model: Producer }],
      order: [['created', 'DESC']],
      limit: 8
    })
    return res.json(listings)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

// List all listings by a producer
listingController.listListings = async (req: any, res: any) => {
  const producer_id = req.user.id
  try {
    const listings = await Listing.findAll({
      where: { producer_id },
      include: [{ model: Product }]
    })

    return res.json(listings)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

// Create a new listing
listingController.createListing = async (req: any, res: any) => {
  try {
    const listing = await Listing.create({
      producer_id: req.user.id,
      product_id: req.body.product_id,
      title: req.body.title,
      description: req.body.description,
      price_per_unit: req.body.price_per_unit,
      min_quantity: req.body.min_quantity,
      delivery_method: req.body.delivery_method
    })
    return res.json(listing)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

// Delete listing
listingController.deleteListing = async (req: any, res: any) => {
  const { id } = req.params
  try {
    const listing = await Listing.findOne({ where: { id } })
    // TODO: Ok to throw errors?
    if (!listing) {
      throw new Error('Error: No listing with id')
    }
    await listing.destroy()
    return res.sendStatus(200)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

listingController.updateListing = async (req: any, res: any) => {
  const { id } = req.params
  const { title, description, price_per_unit, min_quantity, delivery_method, product_id } = req.body
  try {
    const listing = await Listing.findOne({ where: { id } })
    // TODO: Ok to throw errors?
    if (!listing) {
      throw new Error('Error: No listing with id')
    }
    console.log(product_id)
    listing.setDataValue('title', title)
    listing.setDataValue('description', description)
    listing.setDataValue('price_per_unit', price_per_unit)
    listing.setDataValue('min_quantity', min_quantity)
    listing.setDataValue('delivery_method', delivery_method)
    listing.setDataValue('product_id', product_id)
    await listing.save()
    return res.json(listing)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

listingController.getListing = async (req: any, res: any) => {
  const { id } = req.params
  try {
    return res.json(await Listing.findOne({ where: { id }, include: [{ model: Product }] }))
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

export default listingController
