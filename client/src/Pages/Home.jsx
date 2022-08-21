import React, { useEffect } from 'react'
import '../styles/Home/home.css';
import '../styles/Home/home-col-2.css';
import QuestionCard from '../components/Home/QuestionCard';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import HomeColLeft from '../components/Home/HomeColLeft';
import Loader from '../components/Loader/Loader';
import bannerImg from '../assets/banner.jpg'
import HomeCol3 from '../components/Home/HomeCol3';
import { useState } from 'react';

const Home = () => {


    const [page, setPage] = useState(0);

    console.log(page);

    const location = useLocation();

    const navigate = useNavigate();

    const { data: questions, isLoading } = useQuery(['all_questions_', page],
        async () => {
            const res = await axios({
                method: 'get',
                url: `api/v1/all-questions?page=${page}`
            })
            return res.data;
        },
        {
            onSettled: () => {
                console.log(questions);
            }
        }
    )

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [page])



    return (
        <div className='home-wrapper'>
            <HomeColLeft />
            <div className="home-col-2">
                <div className="home-col-2-header">
                    <div className="home-col-2-header-title">
                        Top Questions
                    </div>
                    <div className="home-col-2-header-ask-button"
                        onClick={() => navigate('/question/ask')}>
                        Ask Question
                    </div>
                </div>
                {/* <div className="home-col-2-tag-row">
                    <div className="home-col-2-tag-row-item">
                        Today
                    </div>
                    <div className="home-col-2-tag-row-item">
                        Week
                    </div>
                    <div className="home-col-2-tag-row-item">
                        Month
                    </div>
                </div> */}
                {
                    !isLoading ? <div className="home-col-2-question">
                        {
                            questions?.data.map((el) => {
                                return <QuestionCard
                                    key={el._id} data={el} />
                            })
                        }
                    </div> :
                        <Loader />
                }

                <div className='question-pagination-wrapper'>
                    <div className="question-pagination">
                        <div
                            onClick={() => {
                                if (page > 0) {
                                    setPage(page - 1)
                                }
                            }}>
                            &laquo;
                        </div>

                        {
                            Array(questions?.totalPages)
                                .fill(0)
                                .map((el, idx) => (
                                    <div className={page === idx ? 'active' : null}
                                        onClick={() => setPage(idx)}>{idx + 1}</div>
                                ))
                        }

                        <div
                            onClick={() => {
                                if (page < questions?.totalPages - 1) {
                                    setPage(page + 1)
                                }
                            }}>&raquo;</div>
                    </div>
                </div>

                <div className='home-col-2-bottom'>
                    Looking for more? Browse the <a href="/"> complete list of questions</a>, or popular tags. Help us answer unanswered questions.
                </div>
            </div>
            <HomeCol3 />
        </div>
    )
}

export default Home