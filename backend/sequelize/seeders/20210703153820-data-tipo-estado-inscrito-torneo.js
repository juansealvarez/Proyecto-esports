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
    await queryInterface.bulkInsert('Tipo',[{
      nombre: 'Todos contra todos',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      nombre: 'Eliminación directa',
      createdAt : new Date(),
      updatedAt : new Date()
    }]);
    await queryInterface.bulkInsert('Estado',[{
      nombre: 'Abierto',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      nombre: 'En curso',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      nombre: 'Cerrado',
      createdAt : new Date(),
      updatedAt : new Date()
    }]);
    await queryInterface.bulkInsert('Inscrito',[{
      nombre: 'Si',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      nombre: 'No',
      createdAt : new Date(),
      updatedAt : new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Tipo', null, {});
     await queryInterface.bulkDelete('Estado', null, {});
     await queryInterface.bulkDelete('Inscrito', null, {});
  }
};
