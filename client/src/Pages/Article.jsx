import React from 'react'
import '../styles/Article/article.css';
import MDEditor from '@uiw/react-md-editor';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import axios from 'axios';
import Moment from 'react-moment';
import Loader from '../components/Loader/Loader';

const Article = () => {

    const { id } = useParams();
    console.log(id);

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

    console.log(data);

    return (

        !isLoading ?
            <div className='article-wrapper'>
                <div className="article-owner-details">
                    <div className="article-owner-profile">
                        <img src="" alt="" />
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
                {/* <div className="article-image">
                    <img src="https://s3.ap-south-1.amazonaws.com/afteracademy-server-uploads/what-is-fragmentation-and-what-are-its-types-banner-d452d024f71c28ba.png" alt="" />
                </div> */}
                <div className='article-body'>
                    <MDEditor.Markdown source={data?.articleContent.body} />
                </div>
            </div>
            :
            <Loader />
    )
}

export default Article