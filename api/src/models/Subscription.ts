import { Model, DataTypes } from 'sequelize'
import sequelize from '../db'
import Producer from './Producer'

class Subscription extends Model { }

Subscription.init({
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  producer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  sequelize,
  modelName: 'Subscription',
  tableName: 'Subscription',
  timestamps: false
})

Subscription.belongsTo(Producer, { foreignKey: 'producer_id' })

export default Subscription
