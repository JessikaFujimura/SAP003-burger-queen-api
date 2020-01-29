'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    menu: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
    type: DataTypes.STRING
  }, {});
  Product.associate = function(models) {
    //Product.belongsTo(models.Table)
  };
  return Product;
};