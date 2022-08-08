import React from 'react';
import WriteCard from '../components/Write/WriteCard';
import '../styles/Write/write.css'

const Write = () => {

    const article = {
        head: "Article",
        subHead: "Good Article is relatively easy to create. Most people don’t realize it, but everybody has interesting things to say. Good technique is harder — it can seem abstract and nuanced, and it’s often the thing that makes or breaks an article.",
        action: "Write an Article",
        route: "/write/article"
    }
    const question = {
        head: "Question",
        subHead: "When asking a question, people will be better able to provide help if you provide code that they can easily understand and use to reproduce the problem. This is referred to by community members as creating a minimal, reproducible example",
        action: "Ask a question",
        route: "/write/question/ask"
    }
    return (
        <div className='write-boxes-wrapper'>
            <WriteCard value={question} />
            <WriteCard value={article} />
        </div>
    )
}

export default Write