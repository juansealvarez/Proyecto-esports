'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Equipo.belongsTo(models.Usuario, {
        foreignKey : 'user_id'
      });
    }
  };
  Equipo.init({
    user: DataTypes.STRING,
    correo: DataTypes.STRING,
    password: DataTypes.STRING,
    equipo: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Equipo',
    freezeTableName: true
  });
  return Equipo;
};