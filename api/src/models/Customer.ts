import { Model, DataTypes } from 'sequelize'
import sequelize from '../db'

class Customer extends Model { }

Customer.init({
  customer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 100]
    }
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 100]
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [1, 40]
    }
  }
}, {
  sequelize,
  modelName: 'Customer',
  tableName: 'Customer',
  timestamps: false,
  createdAt: false
})

export default Customer
