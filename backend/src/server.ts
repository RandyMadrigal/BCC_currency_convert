import app from "./app";
import connection from "./config/db.connection";

const port = process.env.PORT || 3000;

connection()
  .then(() => {
    console.log(">>> Connected to MongoDB database");
    app.listen(port, () => console.log(`>>> server running in port ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });
