module.exports = (sequelize, type) => {
  return sequelize.define(
    "article_has_category",
    {
      Article_id: {
        type: type.INTEGER,
        primaryKey: true,
      },
      Category_id: {
        type: type.INTEGER,
        primaryKey: true,
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
      underscored: true
    }
  );
};
