const mongoose = require("mongoose");


const articleSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
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


const articleModel = mongoose.model('Article', articleSchema);

module.exports = articleModel;