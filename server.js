const express = require("express");
const fileUpload = require("express-fileupload");
const connectDB = require("./config/db");

const app = express();

//Connect DB
connectDB();

//Init Middleware (instead of bodyparser.json() for the request bodies )
app.use(express.json({ extended: false }));

app.use(fileUpload());

app.get("/", (req, res) => res.send("API running"));

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/music", require("./routes/api/music"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
