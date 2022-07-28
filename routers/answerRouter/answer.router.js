const express = require("express");
const { postAnswerController, addVoteAnswerController, removeVoteAnswerController } = require("../../controller/answer.controller");
const answerModel = require("../../models/answer.model");


const answerRouter = express.Router();


//posing answer
answerRouter.post('/answer/post', postAnswerController);

//add vote to answer
answerRouter.put('/answer/add-vote', addVoteAnswerController);

//remove vote to answer
answerRouter.put('/answer/remove-vote', removeVoteAnswerController);

module.exports = answerRouter;