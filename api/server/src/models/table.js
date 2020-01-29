'use strict';
module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define('Table', {
    option: DataTypes.STRING,
  }, {});
  Table.associate = function(models) {
    // Table.hasMany(models.Product, {
    //   foreingKey: 'productId'
    // })
    // Table.hasMany(models.Order, {
    //   foreingKey: 'orderId'
    // })
  };
  return Table;
};