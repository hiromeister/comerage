const Article = (sequelize, DataTypes) => {
  sequelize.define("article", {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    publicationDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    body: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  });
};
