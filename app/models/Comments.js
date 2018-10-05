module.exports = (sequelize, type) => {
    return sequelize.define(
      "comment",
      {
        publicationDate: {
          type: type.STRING
        },
        publicationDate: {
            type: type.DATE
        },
        body: {
          type: type.STRING
        },
        Article_id: {
          type: type.INTEGER
        },
        User_id:{
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
  