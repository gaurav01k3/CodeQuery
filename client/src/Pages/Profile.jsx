import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import HomeColLeft from '../components/Home/HomeColLeft'
import '../styles/Profile/profile.css';

const Profile = () => {

    const user = useSelector((state) => state.userDetails.existingUser);

    const { data: userProf } = useQuery(
        'user' + user._id,
        async () => {
            const res = await axios({
                method: 'get',
                url: `/api/v1/user-profile/${user._id}`
            })
            return res.data;
        }
    )

    return (
        <div className='home-wrapper'>
            <HomeColLeft />
            <div className='profile-wrapper'>
                <div className="profile-header">
                    <div className="profile-image">
                        <img src="https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png" alt="" />
                        <div></div>
                    </div>
                    <div className="profile-details">
                        <div className="profile-details-name">
                            {userProf?.name}
                        </div>
                        <div className="profile-details-title">
                            {userProf?.title}
                        </div>
                        <div className="profile-details-joining">
                            <div className="profile-details-joining-dur">
                                {userProf?.joinDate}
                            </div>
                        </div>
                    </div>
                    <div className="profile-actions">
                        Edit Profile
                    </div>
                </div>
                <div className="profile-stats">
                    <div className="profile-stats-head">
                        Stats
                    </div>
                    <div className="profile-stats-data-wrapper">
                        <div className="profile-stats-data-box">
                            <div className="profile-stats-data-quan">
                                {userProf?.questions.length}
                            </div>
                            <div className="profile-stats-data-title">
                                questions
                            </div>
                        </div>
                        <div className="profile-stats-data-box">
                            <div className="profile-stats-data-quan">
                                {userProf?.answers.length}
                            </div>
                            <div className="profile-stats-data-title">
                                answers
                            </div>
                        </div>
                        <div className="profile-stats-data-box">
                            <div className="profile-stats-data-quan">
                                {userProf?.articles.length}
                            </div>
                            <div className="profile-stats-data-title">
                                articles
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile