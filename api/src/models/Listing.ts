import { Model, DataTypes } from 'sequelize'
import sequelize from '../db'
import Product from './Product'
import Producer from './Producer'

class Listing extends Model {}

Listing.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    producer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price_per_unit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    min_quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    delivery_method: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Listing',
    tableName: 'Listing',
    timestamps: false
  }
)

Listing.belongsTo(Product, { foreignKey: 'product_id' })
Listing.belongsTo(Producer, { foreignKey: 'producer_id' })

export default Listing
