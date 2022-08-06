const express = require("express");
const questionModel = require("../../models/question.model");
const { allQuestionsController, questionAskController, questionByIdController, addAnswerController, addVoteQuestionController, removeVoteQuestionController, addQuestionToUser } = require('../../controller/question.controller')



const questionRouter = express.Router();


// asking a question post req
questionRouter.post('/question/ask', questionAskController);

//get all questions
questionRouter.get('/all-questions', allQuestionsController)


//get a particular question by id
questionRouter.get('/question/:id', questionByIdController)

//add answer to question
questionRouter.put('/add-answer', addAnswerController)

//add vote to question
questionRouter.put('/question/add-vote', addVoteQuestionController)

//remove vote to question
questionRouter.put('/question/remove-vote', removeVoteQuestionController)


module.exports = questionRouter;