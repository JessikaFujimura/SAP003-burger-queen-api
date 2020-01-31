'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    menu: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
    type: DataTypes.STRING
  }, {});
  Product.associate = function(models) {
    Product.hasMany(models.Table, { foreignKey: 'productId' })
    Product.hasMany(models.Table, { foreignKey: 'typeId' })
  };
  return Product;
};