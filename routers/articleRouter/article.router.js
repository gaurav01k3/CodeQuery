const { Router } = require("express");
const express = require("express");
const { articleShareController, allArticleController, articleByIdController } = require("../../controller/article.controller");


const articleRouter = express.Router();



// posting a article
articleRouter.post('/share-article', articleShareController);

// get all articles
articleRouter.get('/all-articles', allArticleController);

// //get a particular article by id
articleRouter.get('/article/:id', articleByIdController);

module.exports = articleRouter;