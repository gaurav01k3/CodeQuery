import React from 'react';
import WriteCard from '../components/Write/WriteCard';
import '../styles/Write/write.css'

const Write = () => {

    const article = {
        head: "Article",
        subHead: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, porro nihil. Aliquid facere voluptatum nostrum nesciunt asperiores. Facere libero, iusto voluptatibus exercitationem blanditiis modi? Tenetur minima accusamus dolores quasi provident!",
        action: "Write an Article",
        route: "/write/article"
    }
    const question = {
        head: "Question",
        subHead: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, porro nihil. Aliquid facere voluptatum nostrum nesciunt asperiores. Facere libero, iusto voluptatibus exercitationem blanditiis modi? Tenetur minima accusamus dolores quasi provident!",
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