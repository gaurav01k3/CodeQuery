import React, { useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { BsTriangleFill } from 'react-icons/bs';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Answer = ({ ques_id, data: answer }) => {

    const [isVoted, setIsvoted] = useState(false);
    const user = useSelector((state) => state.userDetails.existingUser);
    const queryClient = useQueryClient();

    console.log(answer._id);

    const notify = () => toast.warning('You cannot vote for your own answer!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    useEffect(() => {
        if (answer?.voters.indexOf(user._id) !== -1) {
            setIsvoted(true);
        }
    }, [])


    // voting the post
    const { mutate: likeAns } = useMutation(
        async (data) => {
            const res = await axios({
                method: 'put',
                url: `/api/v1/answer/add-vote`,
                data
            })
            return res.data;
        },
        {
            onSuccess: (data) => {
                // console.log(data);
                setIsvoted(true);
                queryClient.invalidateQueries('question_' + ques_id);
            }
        }
    )

    //remove voting from the post
    const { mutate: disLikeAns } = useMutation(
        async (data) => {
            const res = await axios({
                method: 'put',
                url: `/api/v1/answer/remove-vote`,
                data
            })
            return res.data;
        },
        {
            onSuccess: (data) => {
                // console.log(data);
                setIsvoted(false);
                queryClient.invalidateQueries('question_' + ques_id);
            }
        }
    )

    const handleVote = () => {
        if (!isVoted) {
            if (answer.createdBy === user._id) {
                notify();
            } else {
                likeAns({
                    voter_id: user._id,
                    ans_id: answer._id,
                })
            }
        } else {
            disLikeAns({
                voter_id: user._id,
                ans_id: answer._id,
            })
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
            <div className="question-body-wrapper">
                <div className='question-actions'>
                    <div className='question-vote-icon'>
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
                        {answer?.voters.length}
                    </div>
                </div>
                <div className='question-colo-2-body-content'>
                    <MDEditor.Markdown source={answer.body} />
                </div>
            </div>
            <div className='owner'>
                <div className="owner-head">
                    answered <Moment fromNow>{answer.createdAt}</Moment>
                </div>
                <div className='owner-details'>
                    {/* {answer?.createdBy.} */}
                </div>
            </div>
        </>
    )
}

export default Answer