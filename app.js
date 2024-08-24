require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/database");
const entryRoutes = require("./routes/index");
const bodyParser = require("body-parser");


const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

//routes
 app.use('/api', entryRoutes);

app.get("/", (req, res) => {
    res.send(`<h1>Server is running on Port ${port}</h1>`);
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
