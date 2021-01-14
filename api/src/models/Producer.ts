import { Model, DataTypes } from 'sequelize'
import sequelize from '../db'

class Producer extends Model { }

Producer.init({
  producer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  org_nr: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [10, 12]
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [2, 100]
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 500]
    }
  }
}, {
  sequelize,
  modelName: 'Producer',
  tableName: 'Producer',
  timestamps: false,
  createdAt: false
})

export default Producer
