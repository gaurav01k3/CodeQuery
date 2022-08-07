const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');
const authRouter = require('./routers/authRouter/auth');
const questionRouter = require('./routers/questionRouter/question.router');
const cookieParser = require('cookie-parser');
const answerRouter = require('./routers/answerRouter/answer.router');
const articleRouter = require('./routers/articleRouter/article.router');
const cors = require('cors');

const app = express();

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(morgan('tiny'));


app.use('/api/v1/', authRouter)
app.use('/api/v1/', questionRouter);
app.use('/api/v1/', answerRouter);
app.use('/api/v1/', articleRouter)


if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
    console.log("server is running on the port", PORT);
})