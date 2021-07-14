'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Torneo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Torneo.belongsTo(models.Tipo, {
        foreignKey : 'idTipo'
      });
      Torneo.belongsTo(models.Estado, {
        foreignKey : 'idEstado'
      });
      Torneo.belongsTo(models.Inscrito, {
        foreignKey : 'idInscrito'
      });
    }
  };
  Torneo.init({
    nombre: DataTypes.STRING,
    fecha_inicio: DataTypes.STRING,
    fecha_fin: DataTypes.STRING,
    nro_participantes: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    max_participantes: DataTypes.INTEGER,
    idTipo: DataTypes.INTEGER,
    nro_partidas_dia: DataTypes.INTEGER,
    part_ganada: DataTypes.INTEGER,
    part_empatada: DataTypes.INTEGER,
    part_perdida: DataTypes.INTEGER,
    nro_equipos_reg: DataTypes.INTEGER,
    max_equipos: DataTypes.INTEGER,
    idEstado: DataTypes.INTEGER,
    idInscrito: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Torneo',
    freezeTableName: true
  });
  return Torneo;
};