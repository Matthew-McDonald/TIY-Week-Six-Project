'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'messagetables',
      'userid', {
        type: Sequelize.INTEGER,
        references: {
          model: 'logintables',
          key: 'id'
        }
      }
    )
  },

 down: function (queryInterface, Sequelize) {
     return queryInterface.removeColumn(
       'messagetables',
       'userid'
     )
  }
};
