module.exports = (sequelize, type) => {
  return sequelize.define(
    "user",
    {
      username: {
        type: type.STRING,
        allowNull: false
      },
      email: {
        type: type.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: type.STRING,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
      underscored: true
    }
  );
};
