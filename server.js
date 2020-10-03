const express = require("express");

const connectDB = require("./config/db");
const app = express();
//Body parser middleware
app.use(express.json({ extended: false }));

//Route files
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const auth = require("./routes/api/auth.js");
const users = require("./routes/api/users.js");
const path = require("path");
//Connect DB
connectDB();
const PORT = process.env.PORT || 5000;

//Define routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/auth", auth);
app.use("/api/posts", posts);

//serve static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`Server started on port :${PORT}`);
});
