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
//Connect DB
connectDB();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "working" });
});
//Define routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/auth", auth);
app.use("/api/posts", posts);

app.listen(PORT, () => {
  console.log(`Server started on port :${PORT}`);
});
