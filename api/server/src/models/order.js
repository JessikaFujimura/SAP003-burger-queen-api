'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    client: DataTypes.STRING,
    status: DataTypes.STRING,
    table: DataTypes.INTEGER,
    waiter: DataTypes.STRING
  }, {});
  Order.associate = function(models) {
    Order.hasMany(models.Table, { foreignKey: 'orderId' })
  };
  return Order;
};