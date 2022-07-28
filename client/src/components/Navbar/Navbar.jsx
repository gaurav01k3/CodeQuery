import React, { useEffect, useRef, useState } from 'react'
import '../../styles/Navbar/Navbar.css'
import { GoSearch } from 'react-icons/go';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import NavbarSearch from './NavbarSearch';
import Cookies from 'js-cookie';
import ProfileDrop from './ProfileDrop';

const Navbar = () => {

    const [isHamOpen, setIsHamOpen] = useState(false);

    const [isSearchOpen, setIsSearchOpen] = useState(0);

    const [isProfileDropOpen, setIsProfileDropOpen] = useState(0);

    // console.log(isSearchOpen);

    const profileDropElem = useRef();
    const profileCircle = useRef();
    // console.log(profileDropElem.current);


    const navigate = useNavigate();


    // Storing token to verifying login and logout
    const token = Cookies.get('CQ-token');


    const location = useLocation();



    // drop down handler
    useEffect(() => {

        let handler = (event) => {
            // addied these conditions because of dual behaviour of drop down open
            if (isProfileDropOpen && !profileDropElem.current.contains(event.target) && event.target !== profileCircle.current) {
                setIsProfileDropOpen(false);
            }
        }

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        }
    })

    //close profile drop down on location change 
    useEffect(() => {
        setIsProfileDropOpen(false);
    }, [location])



    const handleHam = () => {
        if (isHamOpen) setIsHamOpen(false);
        else setIsHamOpen(true);
    }



    const handleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    }

    return (
        <div
            className='navbar-parent'>

            {/* second search bar */}
            {/* <div className={isSearchOpen ? "navbar-search navbar-cond-search" : "navbar-cond-search-display navbar-search navbar-cond-search"}>
                <div className='navbar-search-input'>
                    <div className='navbar-search-icon'>
                        <GoSearch fontSize={14} opacity={0.5} />
                    </div>
                    <input
                        type="text" placeholder='Search here...' />
                </div>
            </div> */}


            <div
                className='navbar-wrapper'>
                <div
                    onClick={() => handleHam()}
                    className={isHamOpen ? "ham-wrabox ham-open" : "ham-wrabox"}
                >
                    <div className='hamburger-line'></div>
                </div>
                <Link to='/'>
                    <div className="navabr-logo">
                        CODEQUERY
                    </div>
                </Link>
                <div className="navbar-item-wrapper">
                    <div className='navbar-item hm-menu-hidden-850'
                        onClick={() => navigate('/')}>Home</div>
                    <div className='navbar-item hm-menu-hidden-850'
                        onClick={() => navigate('/write')}>Write</div>
                    <div className='navbar-item hm-menu-hidden-1050'
                        onClick={() => navigate('/articles')}>Articles</div>
                    {/* <div className='navbar-item hm-menu-hidden-1050'>Notifications</div> */}
                </div>

                <NavbarSearch />

                {
                    token === undefined ? (
                        <div className="navbar-auth">
                            <div className='navbar-auth-search-icon'
                                onClick={() => handleSearch()}>
                                <GoSearch fontSize={20} opacity={1} />
                            </div>
                            <Link to='/login'>
                                <div className='navbar-auth-item'>Login</div>
                            </Link>
                            <Link to='/signup'>
                                <div className='navbar-auth-item navbar-signup'>Sign-Up</div>
                            </Link>
                        </div>
                    ) :
                        (
                            <div className="navbar-auth">
                                <div
                                    className='navbar-auth-search-icon'
                                    onClick={() => handleSearch()}>
                                    <GoSearch fontSize={20} opacity={1}
                                    />
                                </div>
                                <div
                                    ref={profileCircle}
                                    onClick={() => setIsProfileDropOpen(!isProfileDropOpen)}
                                    className='navbar-profile-circle'>
                                </div>
                            </div>
                        )
                }

                {/* //profile drop  */}
                {
                    isProfileDropOpen ?
                        <ProfileDrop ref={profileDropElem} />
                        : null
                }

                {/* //Ham menu  */}
                <div
                    className='ham-menu' style={{ display: isHamOpen ? 'block' : 'none' }}>
                    <Link to='/'>
                        <div>Home</div>
                    </Link>
                    <Link to='/'>
                        {/* <div>Posts</div> */}
                    </Link>
                    <Link to='/write'>
                        <div>Write</div>
                    </Link>
                    <Link to='/'>
                        <div>About</div>
                    </Link>
                    <Link to='/'>
                        {/* <div>Leaderboard</div> */}
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default Navbar