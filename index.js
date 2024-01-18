// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors= require('cors');
const dotenv= require('dotenv');
const routesuser = require('./routes/user');
const routefolder= require('./routes/folders');
const routefile= require('./routes/fileRoutes');

const app = express();
dotenv.config()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
   res.send("hii, how are you");
 });
 
app.use('/api', routesuser);
app.use('/file', routefile); 
app.use('/folder', routefolder);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
