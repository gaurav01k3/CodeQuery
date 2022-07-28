const mongoose = require("mongoose");


const answerSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    },
    voters: [
        {
            type: String
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
    { timestamps: true }
)



const answerModel = mongoose.model('Answer', answerSchema);

module.exports = answerModel;