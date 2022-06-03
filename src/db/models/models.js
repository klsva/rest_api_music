import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

export const Author = sequelize.define('author', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

export const Song = sequelize.define('song', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, unique: true, allowNull: false}
})

Author.hasMany(Song)
Song.belongsTo(Author)


