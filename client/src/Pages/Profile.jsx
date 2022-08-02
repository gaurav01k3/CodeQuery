import React from 'react'
import { useSelector } from 'react-redux';
import HomeColLeft from '../components/Home/HomeColLeft'
import '../styles/Profile/profile.css';

const Profile = () => {

    const user = useSelector((state) => state.userDetails.existingUser);
    // console.log(user._id);

    return (
        <div className='home-wrapper'>
            <HomeColLeft />
            <div className='profile-wrapper'>
                <div className="profile-header">
                    <div className="profile-image">
                        <img src="https://lh3.googleusercontent.com/a-/AOh14GhLC9ya1tZEVq8eVfCjeOn6bVKFky1-9I8HGxoGww=k-s256" alt="" />
                        <div></div>
                    </div>
                    <div className="profile-details">
                        <div className="profile-details-name">
                            {user?.name}
                        </div>
                        <div className="profile-details-title">
                            Lorem ipsum
                        </div>
                        <div className="profile-details-joining">
                            <div className="profile-details-joining-dur">
                                Member for lorem ipsum now
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
                                0
                            </div>
                            <div className="profile-stats-data-title">
                                questions
                            </div>
                        </div>
                        <div className="profile-stats-data-box">
                            <div className="profile-stats-data-quan">
                                0
                            </div>
                            <div className="profile-stats-data-title">
                                answers
                            </div>
                        </div>
                        <div className="profile-stats-data-box">
                            <div className="profile-stats-data-quan">
                                0
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