const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  dataNascimento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  cep: {
    type: DataTypes.STRING,
  },
  endereco: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User;
