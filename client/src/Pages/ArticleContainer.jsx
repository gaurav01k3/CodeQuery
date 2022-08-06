import React from 'react'
import HomeColLeft from '../components/Home/HomeColLeft'
import '../styles/Home/home.css';
import '../styles/Article/articleContainer.css';
import HomeCol3 from '../components/Home/HomeCol3';
import ArticleCard from '../components/Article/ArticleCard';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loader from '../components/Loader/Loader';

const ArticleContainer = () => {

    const { data, isLoading } = useQuery(
        'all-articles',
        async () => {
            const res = await axios({
                method: 'get',
                url: '/api/v1/all-articles'
            })
            return res.data;
        }
    )

    // console.log(data);

    return (
        <div className='home-wrapper'>
            <HomeColLeft />
            <div className="article-container-col-2">
                <div className="article-container-header">
                    <div>
                        Recommended
                    </div>
                    {/* <div>
                        Following
                    </div> */}
                </div>



                {
                    !isLoading ?

                        data?.articles.map(
                            (el) => {
                                return <ArticleCard key={el._id} articleData={el} />
                            }
                        )
                        :
                        <Loader />
                }


            </div>
            <HomeCol3 />
        </div>
    )
}

export default ArticleContainer