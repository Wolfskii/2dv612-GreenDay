import { Model, DataTypes } from 'sequelize'
import sequelize from '../db'

class User extends Model { }

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 30] // TODO: Lägg till ev. felmeddelanden vid validation
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 100], // TODO: Lägg till ev. felmeddelanden vid validation
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 200] // TODO: Lägg till ev. felmeddelanden vid validation
    }
  },
  address_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isInt: true // TODO: Lägg till ev. felmeddelanden vid validation
    }
  },
  role: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  is_blocked: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  last_time_read: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'User',
  timestamps: false
})

export default User
