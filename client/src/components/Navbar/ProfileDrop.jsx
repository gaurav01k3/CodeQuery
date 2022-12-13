import React from 'react';
import '../../styles/Navbar/profileDrop.css'
import { IoIosLogOut } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { BsBookmarkStar } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import getUser from '../../redux/actions/user.action';

const ProfileDrop = React.forwardRef((props, ref) => {


    const user = useSelector((state) => state.userDetails.existingUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        Cookies.remove('CQ-token');
        dispatch(getUser({}));
        localStorage.removeItem('CQ-user');
        window.location.reload();
    }

    return (
        <div
            ref={ref}
            className='profile-drop-wrapper'>
            <div className='profile-drop-item'>
                <CgProfile fontSize={25} />
                <div
                    onClick={() => navigate(`/users/${user._id}`)}
                    className='profile-item-heading'>Profile</div>
            </div>
            {/* <div className='profile-drop-item'>
                <BsBookmarkStar fontSize={25} />
                <div
                    onClick={() => navigate(`/bookmarks`)}
                    className='profile-item-heading'>Bookmarks</div>
            </div> */}
            <div className='profile-drop-item'
                onClick={() => navigate('/articles')}>
                <FiUsers fontSize={25} />
                <div className='profile-item-heading'>Users</div>
            </div>
            <div className='profile-drop-item'>
                <IoIosLogOut color='#b23b3b' fontSize={25} />
                <div
                    onClick={() => handleLogout()}
                    className='profile-item-heading sign-out-btn'>Log out</div>
            </div>
        </div>
    )
})

export default ProfileDrop