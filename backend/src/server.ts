import app from "./app";
import connection from "./config/db.connection";
import { initExchange } from "./config/exchangeRate.default";
import { createDefaultAdmin } from "./config/adminUser";

const port = process.env.PORT || 3000;

connection()
  .then(async () => {
    await createDefaultAdmin();
    await initExchange();
    console.log(">>> Connected to MongoDB database");
    app.listen(port, () => console.log(`>>> server running in port ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });
