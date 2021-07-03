'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inscrito extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Inscrito.hasMany(models.Torneo, {
        foreignKey : 'idInscrito',
      });
    }
  };
  Inscrito.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Inscrito',
    freezeTableName: true
  });
  return Inscrito;
};