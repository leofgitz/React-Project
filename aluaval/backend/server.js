import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import weeklyReminder from "./models/jobs/weeklyReminder.js";
import preloadBadges from "./scripts/preloadBadges.js";
import { syncModels } from "./models/index.js";
/* import sequelize from "./config/database.js"; */

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

await preloadBadges().catch(console.error);

async function startServer() {
  try {
    await syncModels();

    await preloadBadges();

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}

startServer();
