'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'liketables',
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
      'liketables',
      'userid'
    )
  }
};
