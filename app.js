// to control my website
const express = require('express');
const app = express();
const port = 5500;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// to import routes file
const allArticlesRouter = require('./routes/all-articles')


// for auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));


const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// mongoose
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority")
  .then((result) => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
  })
  .catch((err) => { console.log(err); });



app.get('/', (req, res) => {

  res.redirect('/all-articles');
});


app.get('/add-new-article', (req, res) => {

  res.render("add-new-article", { mytitle: "create new article" })
});

// all-articles PATH 

app.use("/all-articles", allArticlesRouter)



// 404
app.use((req, res) => {
  res.status(404).send("sorry can't find this page")
});




