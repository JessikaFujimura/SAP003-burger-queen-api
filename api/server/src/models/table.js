'use strict';
module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define('Table', {
    option: DataTypes.STRING,
    quant: DataTypes.INTEGER
  }, {});
  Table.associate = function(models) {
  };
  return Table;
};