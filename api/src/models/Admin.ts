import { Model, DataTypes } from 'sequelize'
import sequelize from '../db'

class Admin extends Model { }

Admin.init({
  admin_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {
  sequelize,
  modelName: 'Admin',
  tableName: 'Admin',
  timestamps: false,
  createdAt: false
})

export default Admin
