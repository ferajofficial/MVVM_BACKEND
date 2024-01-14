//* Initiate the server //
const mongoose = require("mongoose");
const router = require("./routes/user_routes");
const app = require("./app");
require("./routes")(app);

const port = 8080;

// app.get("/");

mongoose
  .connect(
    "mongodb+srv://feraj:XmJWGt6FVOFHSokE@cluster0.of6nuzo.mongodb.net/MVVMDB?retryWrites=true&w=majority"
  )

  .then(() => console.log("Connected to Database ✨"))
  .catch((err) => console.log(err));

app.get("/");

app.listen(port, () => {
  console.log("Listening to the port 8080");
});
