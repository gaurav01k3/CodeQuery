import React from 'react'
import '../../styles/Home/questionCard.css';
import Moment from 'react-moment';
import { useNavigate } from 'react-router';

const QuestionCard = ({ data }) => {

    const navigate = useNavigate();

    console.log(data);

    return (
        <div className="home-question-card">
            <div className="home-question-card-left">
                <div>{data?.voters.length} votes</div>
                <div className={
                    data?.answers.length ? 'home-question-card-answer-count' : ''}>{data?.answers.length} answers</div>
                <div>40 views</div>
            </div>

            <div className="home-question-card-right">
                <div className='home-question-right-title'
                    onClick={() => { navigate(`/question/${data._id}`) }}>
                    {data.title}
                </div>
                <div className="home-question-right-tag-time">
                    <div className="home-question-right-tags">
                        {
                            data.tags.map((el, index) => {
                                return <div key={index}>{el}</div>
                            })
                        }
                    </div>
                    <div className="home-question-time">
                        <Moment fromNow>{data.createdAt}</Moment>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionCard