import app from "./app";
import connection from "./config/db.connection";
import { initExchange } from "./utils/exchangeRateDefault.utils";

const port = process.env.PORT || 3000;

connection()
  .then(async () => {
    await initExchange();
    console.log(">>> Connected to MongoDB database");
    app.listen(port, () => console.log(`>>> server running in port ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });
