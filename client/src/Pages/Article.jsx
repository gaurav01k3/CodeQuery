import React from 'react'
import '../styles/Article/article.css';
import MDEditor from '@uiw/react-md-editor';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import axios from 'axios';
import Moment from 'react-moment';
import Loader from '../components/Loader/Loader';
import userImg from '../assets/imageuser.jpg';

const Article = () => {

    const { id } = useParams();

    const { data, isLoading } = useQuery(
        'article' + id,
        async () => {
            const res = await axios({
                method: 'get',
                url: `/api/v1/article/${id}`
            })
            return res.data;
        }
    )

    return (

        !isLoading ?
            <div className='article-wrapper'>
                <div className="article-owner-details">
                    <div className="article-owner-profile">
                        <img src={userImg} alt="" />
                    </div>
                    <div className="article-credentials">
                        <div className="article-owner-name">
                            {data?.articleContent.createdBy.name}
                        </div>
                        <div className="article-timestamp">
                            <Moment fromNow>{data?.articleContent?.createdAt}</Moment>
                        </div>
                    </div>
                </div>
                <div className="article-title">
                    {data?.articleContent.title}
                </div>
                <div className='article-body'>
                    <MDEditor.Markdown source={data?.articleContent.body} />
                </div>
            </div>
            :
            <Loader />
    )
}

export default Article