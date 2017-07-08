'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'liketables',
      'messageid', {
        type: Sequelize.INTEGER,
        references: {
          model: 'messagetables',
          key: 'id'
        }
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'liketables',
      'messageid'
    )
  }
};
