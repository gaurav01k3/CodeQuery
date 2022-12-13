import React, { useEffect } from 'react'
import '../../styles/Home/questionCard.css';
import Moment from 'react-moment';
import { useNavigate } from 'react-router';
import { useMutation } from 'react-query';
import axios from 'axios';

const QuestionCard = ({ data }) => {

    const navigate = useNavigate();


    const { mutate: addView } = useMutation(
        async (data) => {
            const res = await axios({
                method: 'put',
                url: `/api/v1/question/add-view`,
                data
            })
            return res.data;
        }
    )

    const handleClick = () => {
        addView({
            ques_id: data?._id
        })
        navigate(`/question/${data._id}`);
    }

    return (
        <div className="home-question-card"
            onClick={() => handleClick()}>
            <div className="home-question-card-left">
                <div className='home-question-card-votes'>{data?.voters.length} votes</div>
                <div className={
                    data?.answers.length ? 'home-question-card-answer-count' : ''}>{data?.answers.length} answers</div>
                <div>{data?.views} views</div>
            </div>

            <div className="home-question-card-right">
                <div className='home-question-right-title'>
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

export default QuestionCard;