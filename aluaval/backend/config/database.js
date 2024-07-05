import { Sequelize } from "sequelize";

const sequelize = new Sequelize("aluavaldb", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    freezeTableName: true,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

export default sequelize;
