const Category = (sequelize, DataTypes) => {
  sequelize.define("category", {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};

export default Category;
