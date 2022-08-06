const articleModel = require("../models/article.model");
const userModel = require("../models/user.model");



//posting a article controller
const articleShareController = async (req, res) => {

    const { title, body, createdBy } = req.body;

    if (!title || !body || !createdBy) {
        return res.status(402).json({ message: 'Feilds are missing' });
    }

    try {
        const article = new articleModel({
            title,
            body,
            createdBy
        })

        const data = await article.save();

        // adding this new article to userdata
        const user = await userModel.findByIdAndUpdate(createdBy,
            { $push: { articles: data._id } }, { new: true });

        res.json({ data, user });

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    articleShareController
}

//get all articles
const allArticleController = async (req, res) => {

    try {
        const articles = await articleModel.find().sort({ "createdAt": -1 }).populate('createdBy', '-password');

        res.json({ articles });

    } catch (error) {
        console.log(error);
    }
}

//particular article by id
const articleByIdController = async (req, res) => {


    const id = req.params.id;

    try {
        const articleContent = await articleModel.findOne({ _id: id }).populate('createdBy', '-password');

        res.json({ articleContent });

    } catch (error) {
        res.json({ error: "article not found" })
        console.log(error);
    }
}

module.exports = {
    articleShareController,
    allArticleController,
    articleByIdController
}