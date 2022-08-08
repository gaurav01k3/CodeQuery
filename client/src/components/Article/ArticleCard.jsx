import React, { useEffect } from 'react'
import img from '../../assets/github.png'
import banner from '../../assets/banner.jpg'
import '../../styles/Article/articleCard.css'
import Moment from 'react-moment';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const ArticleCard = ({ articleData }) => {


    const [body, setBody] = useState("");

    useEffect(() => {
        setBody(articleData?.body.replace(/\s?!\S+/g, ''));
    }, [])


    const navigate = useNavigate();

    return (
        <div onClick={() => { navigate(`/article/${articleData._id}`) }} className='article-card-wrapper'>
            <div className="article-card-header">
                <div className="article-card-owner-image">
                    <img src="https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png" alt="" />
                </div>
                <div className="article-card-owner">
                    {articleData?.createdBy.name}
                </div>
                <div className="article-post-date">
                    . <Moment fromNow>{articleData?.createdAt}</Moment>
                </div>
            </div>
            <div className="article-card-content-wrapper">
                <div className="article-card-content">
                    <div className="article-card-heading">
                        {articleData?.title}
                    </div>
                    <div className="article-card-sub-head">
                        {body}
                    </div>
                </div>
                <div className="article-card-image">
                    <img src={banner} alt="" />
                </div>
            </div>
            <div className="article-card-other-info">
                <div>dummy</div>
                <div>5 min dummy</div>
            </div>
        </div>
    )
}

export default ArticleCard