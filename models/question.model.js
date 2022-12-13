const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tags: [
        {
            type: String,
            required: true
        }
    ],
    views: {
        type: Number,
        default: 0,
    },
    voters: [
        {
            type: String,
        }
    ],
    markedby: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    answers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer"
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
    { timestamps: true }
)


const questionModel = mongoose.model('Question', questionSchema);


module.exports = questionModel;