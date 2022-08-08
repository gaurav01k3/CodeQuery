import React, { useEffect } from 'react'
import '../styles/Home/home.css';
import '../styles/Home/home-col-2.css';
import QuestionCard from '../components/Home/QuestionCard';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';
import HomeColLeft from '../components/Home/HomeColLeft';
import Loader from '../components/Loader/Loader';
import bannerImg from '../assets/banner.jpg'
import HomeCol3 from '../components/Home/HomeCol3';
import { useState } from 'react';

const Home = () => {


    const [page, setPage] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const navigate = useNavigate();

    const { data: questions, isLoading } = useQuery('all-questions_home',
        async () => {
            const res = await axios({
                method: 'get',
                url: `api/v1/all-questions?${page}`
            })
            return res.data;
        },
        {
            onSettled: () => {
                // console.log(questions);
            }
        }
    )



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
                <div className="home-col-2-tag-row">
                    <div className="home-col-2-tag-row-item">
                        Today
                    </div>
                    <div className="home-col-2-tag-row-item">
                        Week
                    </div>
                    <div className="home-col-2-tag-row-item">
                        Month
                    </div>
                </div>
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

                {/* <div className='question-pagination-wrapper'>
                    <div class="question-pagination">
                        <div onClick={() => setPage(page - 1)}>&laquo;</div>
                        <div className={page === 0 ? 'active' : null}
                            onClick={() => setPage(0)}>{page + 1}</div>
                        <div className={page === 1 ? 'active' : null}
                            onClick={() => setPage(1)}>2</div>
                        <div className={page === 2 ? 'active' : null}
                            onClick={() => setPage(3)}>3</div>
                        <div className={page === 1 ? 'active' : null}
                            onClick={() => setPage(4)}>4</div>
                        <div className={page === 1 ? 'active' : null}
                            onClick={() => setPage(5)}>5</div>
                        <div className={page === 1 ? 'active' : null}
                            onClick={() => setPage(6)}>6</div>
                        <div onClick={() => setPage(page + 1)}>&raquo;</div>
                    </div>
                </div> */}

                <div className='home-col-2-bottom'>
                    Looking for more? Browse the <a href="/"> complete list of questions</a>, or popular tags. Help us answer unanswered questions.
                </div>
            </div>
            <HomeCol3 />
        </div>
    )
}

export default Home