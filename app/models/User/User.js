const User = (sequelize, DataTypes) => {
  sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};
