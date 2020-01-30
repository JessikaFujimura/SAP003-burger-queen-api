'use strict';
module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define('Table', {
    option: DataTypes.STRING,
  }, {});
  Table.associate = function(models) {
  };
  return Table;
};