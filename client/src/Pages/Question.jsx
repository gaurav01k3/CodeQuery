import React, { useEffect, useState } from 'react'
import '../styles/Home/home.css';
import '../styles/Home/home-col-2.css';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import '../styles/Question/question-col-2.css'
import MDEditor from '@uiw/react-md-editor';
import { BsFillBookmarkStarFill, BsTriangleFill } from 'react-icons/bs';
import { GoBookmark } from 'react-icons/go';
import Answer from '../components/Answer/Answer';
import Moment from 'react-moment';
import HomeColLeft from '../components/Home/HomeColLeft';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';
import { Slide, toast, ToastContainer } from 'react-toastify';
import userImg from '../assets/imageuser.jpg'



const Question = () => {

    const { id } = useParams();
    const [bodyContent, setBodyContent] = useState("");
    const [isVoted, setIsvoted] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const user = useSelector((state) => state.userDetails.existingUser);
    const navigate = useNavigate();
    const queryClient = useQueryClient();


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const notify = (message) => toast.warning(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

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
                if (question?.data?.voters.indexOf(user?._id) !== -1) {
                    setIsvoted(true);
                }
                if (question?.data?.markedby.indexOf(user?._id) !== -1) {
                    setIsBookmarked(true);
                }
            }
        }
    )

    //adding answer to question after posting it to answer model
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


    // adding vote to the post
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


    const handleVote = () => {
        if (!user) {
            notify('You must be loged in to vote!!');
        } else if (question?.data?.createdBy._id === user?._id) {
            notify('You cannot vote for your own question!');
        }
        else {
            if (!isVoted) {
                likeQues({
                    voter_id: user?._id,
                    ques_id: id,
                })
            } else {
                disLikeQues({
                    voter_id: user?._id,
                    ques_id: id,
                })
            }
        }
    }


    // adding vote to the post
    const { mutate: addBookmark } = useMutation(
        async (data) => {
            const res = await axios({
                method: 'put',
                url: `/api/v1/question/add-bookmark`,
                data
            })
            return res.data;
        },
        {
            onSuccess: (data) => {
                // console.log(data);
                setIsBookmarked(true);
                queryClient.invalidateQueries('question_' + id);
            }
        }
    )

    //remove voting from the post
    const { mutate: removeBookmark } = useMutation(
        async (data) => {
            const res = await axios({
                method: 'put',
                url: `/api/v1/question/remove-bookmark`,
                data
            })
            return res.data;
        },
        {
            onSuccess: (data) => {
                // console.log(data);
                setIsBookmarked(false);
                queryClient.invalidateQueries('question_' + id);
            }
        }
    )


    const handleBookmark = () => {
        if (!user) {
            notify('You must be loged in to bookmark!!');
        } else if (question?.data?.createdBy._id === user?._id) {
            notify('You cannot bookamark for your own question!');
        }
        else {
            if (!isBookmarked) {
                addBookmark({
                    user_id: user?._id,
                    ques_id: id,
                })
            } else {
                removeBookmark({
                    user_id: user?._id,
                    ques_id: id,
                })
            }
        }
    }






    // answering the question
    const handleSubmit = () => {
        if (user) {
            postAnswer({
                body: bodyContent,
                question: id,
                createdBy: user?._id
            })
        } else {
            notify('You must be loged in to answer!!');
        }
    }

    return (

        <>
            <ToastContainer
                position="top-center"
                transition={Slide}
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
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
                                    <div className='question-col-2-status-time'>
                                        <pre>Asked : </pre>
                                        <div className='question-col-2-asked-date'>
                                            <Moment fromNow>{question?.data.createdAt}</Moment>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="question-body-wrapper">

                                <div className='question-actions'>
                                    <div className='question-vote-icon'>
                                        {!isVoted ?
                                            <BsTriangleFill
                                                onClick={handleVote}
                                                color='hsl(210,8%,75%)' size={25} />
                                            : <BsTriangleFill
                                                onClick={handleVote}
                                                color='hsl(27deg 90% 55%)' size={25} />
                                        }
                                    </div>
                                    <div className='question-vote-count'>
                                        {question?.data.voters.length}
                                    </div>
                                    <div className='question-actions-bookmark'>
                                        {!isBookmarked ?
                                            <GoBookmark onClick={handleBookmark} color='hsl(210,8%,75%)' size={18} />
                                            : <GoBookmark onClick={handleBookmark} color='hsl(27deg 90% 55%)' size={18} />
                                        }
                                    </div>
                                    <div className='question-bookmark-count'>
                                        {question?.data.markedby.length}
                                    </div>
                                </div>
                                <div className='question-col-2-body-content'>
                                    <MDEditor.Markdown source={question?.data.body} />
                                </div>
                            </div>


                            <div className='question-owner'>
                                <div className="question-owner-head">
                                    asked <Moment fromNow>{question?.data.createdAt}</Moment>
                                </div>
                                <div className='question-owner-details'>
                                    <div className='question-owner-image'>
                                        <img src={userImg} alt="" />
                                    </div>
                                    <div className='question-owner-name'
                                        onClick={() => navigate(`/users/${question?.data.createdBy._id}`)}>
                                        {question?.data.createdBy.name}
                                    </div>
                                </div>
                            </div>
                            <div className='question-body-noa'>{question?.data.answers.length} Answers</div>
                            <div className="answers-wrapper">
                                {
                                    question?.data.answers.map(el => {
                                        return <Answer
                                            key={el._id}
                                            ques_id={id}
                                            data={el} />
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
        </>
    )
}

export default Question