import { Sequelize } from "sequelize";

function isDST(date) {
  return (
    date.getTimezoneOffset() <
    Math.max(
      new Date(date.getFullYear(), 0, 1).getTimezoneOffset(),
      new Date(date.getFullYear(), 6, 1).getTimezoneOffset()
    )
  );
}

const sequelize = new Sequelize("aluavaldb", "root", "", {
  host: "localhost",
  dialect: "mysql",
  timezone: isDST(new Date()) ? "+01:00" : "+00:00",
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
