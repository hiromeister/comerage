module.exports = (sequelize, type) => {
  return sequelize.define(
    "article",
    {
      title: {
        type: type.STRING
      },
      publicationDate: {
        type: type.DATE
      },
      body: {
        type: type.STRING
      },
      isPrivate: {
        type: type.BOOLEAN
      },
      userId:{
        type: type.INTEGER
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
      underscored: true
    }
  );
};
