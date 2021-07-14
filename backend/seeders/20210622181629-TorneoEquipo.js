'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('TorneoEquipos',[
      {
        IdTorneo:1,
        IdEquipo:1,
        createdAt: new Date(),
        updatedAt: new Date(),
       },
       {
        IdTorneo:2,
        IdEquipo:1,
        createdAt: new Date(),
        updatedAt: new Date(),
        },
        {
          IdTorneo:3,
          IdEquipo:1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          IdTorneo:4,
          IdEquipo:2,
          createdAt: new Date(),
          updatedAt: new Date(),
         },
         {
          IdTorneo:5,
          IdEquipo:3,
          createdAt: new Date(),
          updatedAt: new Date(),
         },
 
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
