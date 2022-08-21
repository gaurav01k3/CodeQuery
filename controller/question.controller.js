const { model } = require("mongoose");
const { findByIdAndUpdate } = require("../models/question.model");
const questionModel = require("../models/question.model");
const userModel = require("../models/user.model");



//ading question and then save this info to user for ref
const questionAskController = async (req, res) => {
    const { title, body, tags, createdBy } = req.body;

    if (!title || !body || !tags || !createdBy) {
        return res.status(422).json({ message: "Fields are missing." })
    }

    if (title.length < 15) {
        return res.status(422).json({
            type: 'title',
            message: 'Title must be atleast 15 characters.'
        })
    }

    if (body.length < 30) {
        return res.status(422).json({
            type: 'body',
            message: 'Body must be atleast 30 characters.'
        })
    }

    try {

        const question = new questionModel({
            title,
            body,
            tags,
            createdBy
        })

        // saving question
        const data = await question.save();

        // adding this new question to userdata
        const user = await userModel.findByIdAndUpdate(createdBy,
            { $push: { questions: data._id } }, { new: true });

        res.json({ data, user });
    } catch (error) {
        console.log(error);
    }
}

//getting all questions
const allQuestionsController = async (req, res) => {

    const PAGE_SIZE = 15;
    const page = parseInt(req.query.page || "0");

    try {

        const total = await questionModel.countDocuments({});
        const data = await questionModel.find().limit(PAGE_SIZE).skip(PAGE_SIZE * page).sort({ "createdAt": -1 }).populate('createdBy', '-password');

        // data.populate('answers.createdBy')

        res.json({
            totalPages: Math.ceil(total / PAGE_SIZE),
            data
        });

    } catch (error) {
        console.log(error);
    }
}


//getting all questions by query
const allQuestionsByQueryController = async (req, res) => {

    const page = parseInt(req.query.search || "");

    try {

        const data = await questionModel.find().sort({ "createdAt": -1 }).populate('createdBy', '-password');


        res.json(data);

    } catch (error) {
        console.log(error);
    }
}


const questionByIdController = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await questionModel.find({ _id: id }).
            populate('createdBy', '-password').
            populate({
                path: 'answers',
                model: 'Answer',
                populate: {
                    path: 'createdBy',
                    model: 'User',
                    select: 'name'
                }
            }
            );

        res.json({ data: data[0] });
    } catch (error) {
        console.log(error);
    }

}

const addAnswerController = async (req, res) => {

    const { ans_id, ques_id } = req.body;
    if (!ans_id || !ques_id)
        return res.status(422).json({ message: "Insufficient information send!!" });

    try {
        const question = await questionModel.findByIdAndUpdate(ques_id,
            { $push: { answers: ans_id } }, { new: true });

        res.send(question);
    } catch (error) {
        console.log(error);
    }
}

const addVoteQuestionController = async (req, res) => {

    const { voter_id, ques_id } = req.body;
    if (!voter_id || !ques_id)
        return res.status(422).json({ message: "Insufficient information send!!" });

    try {
        const question = await questionModel.findByIdAndUpdate(ques_id,
            { $push: { voters: voter_id } }, { new: true });

        res.send(question);
    } catch (error) {
        console.log(error);
    }
}

const removeVoteQuestionController = async (req, res) => {

    const { voter_id, ques_id } = req.body;
    if (!voter_id || !ques_id)
        return res.status(422).json({ message: "Insufficient information send!!" });

    try {
        const question = await questionModel.findByIdAndUpdate(ques_id,
            { $pull: { voters: voter_id } }, { new: true });

        res.send(question);
    } catch (error) {
        console.log(error);
    }
}


const addBookmarkQuestionController = async (req, res) => {

    const { user_id, ques_id } = req.body;
    if (!user_id || !ques_id)
        return res.status(422).json({ message: "Insufficient information send!!" });

    try {
        const question = await questionModel.findByIdAndUpdate(ques_id,
            { $push: { markedby: user_id } }, { new: true });

        res.send(question);
    } catch (error) {
        console.log(error);
    }
}


const removeBookmarkQuestionController = async (req, res) => {

    const { user_id, ques_id } = req.body;
    if (!user_id || !ques_id)
        return res.status(422).json({ message: "Insufficient information send!!" });

    try {
        const question = await questionModel.findByIdAndUpdate(ques_id,
            { $pull: { markedby: user_id } }, { new: true });

        res.send(question);
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    questionAskController,
    allQuestionsController,
    questionByIdController,
    addAnswerController,
    addVoteQuestionController,
    removeVoteQuestionController,
    addBookmarkQuestionController,
    removeBookmarkQuestionController,
    allQuestionsByQueryController
};