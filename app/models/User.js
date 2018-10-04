module.exports = (sequelize, type) => {
  return sequelize.define(
    "user",
    {
      username: {
        type: type.STRING
      },
      email: {
        type: type.DATE
      },
      password: {
        type: type.STRING
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
      underscored: true
    }
  );
};
