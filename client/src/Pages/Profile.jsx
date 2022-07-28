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
                    </div>
                    <div className="profile-user-name">
                        {user?.name}
                    </div>
                    <div className="profile-actions">
                        Edit Profile
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile