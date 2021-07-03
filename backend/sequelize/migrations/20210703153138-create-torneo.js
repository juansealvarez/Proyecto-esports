'use strict';

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Torneo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      fecha_inicio: {
        type: Sequelize.STRING
      },
      fecha_fin: {
        type: Sequelize.STRING
      },
      nro_participantes: {
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING
      },
      max_participantes: {
        type: Sequelize.INTEGER
      },
      idTipo: {
        type: Sequelize.INTEGER
      },
      nro_partidas_dia: {
        type: Sequelize.INTEGER
      },
      part_ganada: {
        type: Sequelize.INTEGER
      },
      part_empatada: {
        type: Sequelize.INTEGER
      },
      part_perdida: {
        type: Sequelize.INTEGER
      },
      nro_equipos_reg: {
        type: Sequelize.INTEGER
      },
      max_equipos: {
        type: Sequelize.INTEGER
      },
      idEstado: {
        type: Sequelize.INTEGER
      },
      idInscrito: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('Torneo',{
      type : 'FOREIGN KEY',
      fields : ['idEstado'],
      name : 'FK_Torneo_Estado',
      references : {
        table : 'Estado',
        field : 'id'
      }
    });
    await queryInterface.addConstraint('Torneo',{
      type : 'FOREIGN KEY',
      fields : ['idTipo'],
      name : 'FK_Torneo_Tipo',
      references : {
        table : 'Tipo',
        field : 'id'
      }
    });
    await queryInterface.addConstraint('Torneo',{
      type : 'FOREIGN KEY',
      fields : ['idInscrito'],
      name : 'FK_Torneo_Inscrito',
      references : {
        table : 'Inscrito',
        field : 'id'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Torneo');
  }
};