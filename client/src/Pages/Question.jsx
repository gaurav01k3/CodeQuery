import React, { useEffect, useState } from 'react'
import '../styles/Home/home.css';
import '../styles/Home/home-col-2.css';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router';
import '../styles/Question/question-col-2.css'
import MDEditor from '@uiw/react-md-editor';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { BsTriangleFill } from 'react-icons/bs';
import { VscTriangleUp } from 'react-icons/vsc';
import { IoTriangleSharp } from 'react-icons/io5';

import Answer from '../components/Answer/Answer';
import Moment from 'react-moment';
import HomeColLeft from '../components/Home/HomeColLeft';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';



const Question = () => {

    const { id } = useParams();
    const [bodyContent, setBodyContent] = useState("");
    const [isVoted, setIsvoted] = useState(false);
    const user = useSelector((state) => state.userDetails.existingUser);


    const queryClient = useQueryClient();

    //getting question by id
    const { data: question, isLoading } = useQuery(['question_' + id],
        async () => {
            const res = await axios({
                method: 'get',
                url: `/api/v1/question/${id}`
            })
            return res.data;
        },
        {
            onSuccess: (question) => {
                // handleIsVoted(question);
                // console.log("question is", question);
                if (question?.data.voters.indexOf(user._id) !== -1) {
                    setIsvoted(true);
                }
            }
        }
    )

    //adding answer
    const { mutate: addAnswer } = useMutation(
        async (data) => {
            const res = await axios({
                method: 'put',
                url: `/api/v1/add-answer`,
                data
            })
            return res.data;
        },
        {
            onSuccess: () => {
                window.location.reload();
            }
        }
    )

    const { mutate: postAnswer } = useMutation(
        async (data) => {
            const res = await axios({
                method: 'post',
                url: `/api/v1/answer/post`,
                data
            })
            return res.data;
        },
        {
            onSuccess: (data) => {
                addAnswer({
                    ques_id: id,
                    ans_id: data?._id
                })
                queryClient.invalidateQueries('question_' + id);
                // setBodyContent("");
            }
        }
    )


    //voting the post
    const { mutate: likeQues } = useMutation(
        async (data) => {
            const res = await axios({
                method: 'put',
                url: `/api/v1/question/add-vote`,
                data
            })
            return res.data;
        },
        {
            onSuccess: (data) => {
                // console.log(data);
                setIsvoted(true);
                queryClient.invalidateQueries('question_' + id);
            }
        }
    )

    //remove voting from the post
    const { mutate: disLikeQues } = useMutation(
        async (data) => {
            const res = await axios({
                method: 'put',
                url: `/api/v1/question/remove-vote`,
                data
            })
            return res.data;
        },
        {
            onSuccess: (data) => {
                // console.log(data);
                setIsvoted(false);
                queryClient.invalidateQueries('question_' + id);
            }
        }
    )


    const handleSubmit = () => {
        postAnswer({
            body: bodyContent,
            question: id,
            createdBy: user._id
        })
    }

    const handleVote = () => {
        if (!isVoted) {
            likeQues({
                voter_id: user._id,
                ques_id: id,
            })
        } else {
            disLikeQues({
                voter_id: user._id,
                ques_id: id,
            })
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <div className='home-wrapper'>
            <HomeColLeft />
            {
                !isLoading ?
                    <div className='question-col-2'>
                        <div className="header-status-row">

                            <div className="question-col-2-header">
                                {question?.data.title}
                            </div>
                            <div className="question-col-2-status-row">
                                <pre>Asked : </pre>
                                <div className='question-col-2-asked-date'>
                                    <Moment fromNow>{question?.data.createdAt}</Moment>
                                </div>
                            </div>
                        </div>

                        <div className="question-body-wrapper">
                            <div className='question-actions'>
                                <div className='question-vote-icon'>
                                    {/* <BsHandThumbsUp color='hsl(210, 8%, 45%)' size={25} /> */}
                                    {/* <BsFillHandThumbsUpFill color='green' size={25}/> */}
                                    {!isVoted ?
                                        <BsTriangleFill
                                            onClick={handleVote}
                                            color='hsl(210,8%,75%)' size={22} />
                                        : <BsTriangleFill
                                            onClick={handleVote}
                                            color='hsl(27deg 90% 55%)' size={22} />
                                    }
                                </div>
                                <div className='question-vote-count'>
                                    {question?.data.voters.length}
                                    {/* 423 */}
                                </div>
                            </div>
                            <div className='question-col-2-body-content'>
                                <MDEditor.Markdown source={question?.data.body} />
                            </div>
                        </div>
                        <div className='owner'>
                            <div className="owner-head">
                                asked <Moment fromNow>{question?.data.createdAt}</Moment>
                            </div>
                            <div className='owner-details'>
                                Gaurav Kumar
                            </div>
                        </div>
                        <div className='question-body-noa'>{question?.data.answers.length} Answers</div>
                        <div className="answers-wrapper">
                            {
                                question?.data.answers.map(el => {
                                    return <Answer ques_id={id} data={el} />
                                })
                            }
                        </div>

                        {/* same component from askQuestion.JSX  */}
                        <div className='answer-editor-section'>
                            <div className="ask-left-input-wrapper">
                                <label className="ask-left-input-head" htmlFor="body">
                                    Your answer
                                </label>
                                <div className='ask-left-input-editor'>
                                    <div>
                                        <MDEditor
                                            height={300}
                                            value={bodyContent}
                                            onChange={setBodyContent}
                                        />
                                    </div>
                                </div>

                                {bodyContent.length ? (<div className="ask-input-body-previewer">
                                    <MDEditor.Markdown source={bodyContent} />
                                </div>) : null}
                            </div>
                        </div>
                        <div className="ask-submit-button btn"
                            onClick={handleSubmit}>
                            Post your answer
                        </div>
                    </div>
                    :
                    <Loader />
            }
            <div className="home-col-3">
            </div>
        </div >
    )
}

export default Question