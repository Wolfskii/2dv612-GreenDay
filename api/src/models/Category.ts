import { Model, DataTypes } from 'sequelize'
import sequelize from '../db'

class Category extends Model { }

Category.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  sequelize,
  modelName: 'Category',
  tableName: 'Category',
  timestamps: false
})

export default Category
