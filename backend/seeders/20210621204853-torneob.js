'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('TorneoBs',[
      {
       nombre: "The Last Of Us",
       FechInicio: "21/06/2021",
       FechFin: "23/06/2021",
       NumParticipantes: 10,
       TipTorneo: "Todos contra todos",
       NumPartidas: 20,
       PuntGanada:100,
       PuntPerdida:10,
       PuntEmpatada: 50,
       createdAt: new Date(),
       updatedAt: new Date(),
      },
      {
        nombre: "Torneo3",
        FechInicio: "25/07/2021",
        FechFin: "27/07/2021",
        NumParticipantes: 5,
        TipTorneo: "Todos contra todos",
        NumPartidas: 9,
        PuntGanada:100,
        PuntPerdida:10,
        PuntEmpatada: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
       },
       {
        nombre: "Torneo4",
        FechInicio: "10/05/2021",
        FechFin: "3/05/2021",
        NumParticipantes: 20,
        TipTorneo: "Todos contra todos",
        NumPartidas: 5,
        PuntGanada:100,
        PuntPerdida:10,
        PuntEmpatada: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
       },
       {
        nombre: "Torneo5",
        FechInicio: "05/08/2021",
        FechFin: "10/08/2021",
        NumParticipantes: 13,
        TipTorneo: "Todos contra todos",
        NumPartidas: 25,
        PuntGanada:100,
        PuntPerdida:10,
        PuntEmpatada: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
       },
       {
        nombre: "Torneo6",
        FechInicio: "03/06/2021",
        FechFin: "05/06/2021",
        NumParticipantes: 8,
        TipTorneo: "Todos contra todos",
        NumPartidas: 10,
        PuntGanada:100,
        PuntPerdida:10,
        PuntEmpatada: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
       },
       {
        nombre: "Torneo7",
        FechInicio: "09/06/2021",
        FechFin: "15/06/2021",
        NumParticipantes: 11,
        TipTorneo: "Todos contra todos",
        NumPartidas: 3,
        PuntGanada:100,
        PuntPerdida:10,
        PuntEmpatada: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
       },
       {
        nombre: "Torneo8",
        FechInicio: "11/06/2021",
        FechFin: "13/06/2021",
        NumParticipantes: 7,
        TipTorneo: "Todos contra todos",
        NumPartidas: 16,
        PuntGanada:100,
        PuntPerdida:10,
        PuntEmpatada: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
       },
       {
        nombre: "Torneo9",
        FechInicio: "24/06/2021",
        FechFin: "27/06/2021",
        NumParticipantes: 19,
        TipTorneo: "Todos contra todos",
        NumPartidas: 10,
        PuntGanada:100,
        PuntPerdida:10,
        PuntEmpatada: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
       }
 
    ],{});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
