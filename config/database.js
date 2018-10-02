import Sequelize from "sequelize";

const sequelizeInit = (
  MYSQL_DATABASE,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_HOST
) => {
  const sequelize = new Sequelize(
    MYSQL_DATABASE,
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    {
      host: MYSQL_HOST,
      dialect: "mysql",
      operatorsAliases: false
    }
  );
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connexion Ok.");
    })
    .catch(err => {
      console.error("Connexion No", err);
    });
  return sequelize;
};

export default sequelizeInit;
