// to import Schema & models
const Article = require('../models/articleSchema');


//article_create_get



const article_index_get = (req, res) => {

    // res.render("index", { mytitle: "HOME" });
   
   // result = Array of objects in the mongo database
     Article.find()
     .then(  (result) => {res.render("index", { mytitle: "HOME" , arrArticle: result });})
     .catch( (err) => {console.log(err)});
   
   };




const article_post = (req, res) => {
   
    const article = new Article(req.body);
  
  
    article
      .save()
      .then(result => {
        res.redirect("/all-articles");
      })
      .catch(err => {
        console.log(err);
      });
  };


const article_details_get = (req, res) => {
     
    // result = object in the mongo database
  
    Article.findById(req.params.id)
  .then(  (result) => { 
    res.render("details", { mytitle: "article details", objArticle: result });})
  .catch( (err) => {console.log(err)});
  };


const article_delete = (req, res) => {
     
    Article.findByIdAndDelete(req.params.id)
    .then((params) => {   res.json( {mylink:'/all-articles'} )     })
    .catch((err) => {
      console.log(err);
    })
  
  };



module.exports = {
    article_index_get, 
    article_post, 
    article_details_get, 
    article_delete
};
