import React from 'react';
import bannerImg from '../../assets/banner.jpg'

const HomeCol3 = () => {
    return (
        <div className="home-col-3">
            <div className='home-col-3-img'>
                <img src={bannerImg} alt="" />
            </div>
            <div className='home-colo-3-header'>
                India's largest community at <a href="/">Codequery</a>
            </div>
        </div>
    )
}

export default HomeCol3