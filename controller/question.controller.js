const questionModel = require("../models/question.model");



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

        const data = await question.save();

        res.json({ data });
    } catch (error) {
        console.log(error);
    }
}


const allQuestionsController = async (req, res) => {
    try {
        const data = await questionModel.find().sort({ "createdAt": -1 }).populate('createdBy', '-password')
        res.json({ data });
    } catch (error) {
        console.log(error);
    }
}


const questionByIdController = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await questionModel.find({ _id: id }).populate('createdBy', '-password').populate('answers')
        // console.log(data[0]);
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

module.exports = {
    questionAskController,
    allQuestionsController,
    questionByIdController,
    addAnswerController,
    addVoteQuestionController,
    removeVoteQuestionController
};