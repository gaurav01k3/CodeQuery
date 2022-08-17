import React, { useEffect, useRef, useState } from 'react'
import '../../styles/Navbar/Navbar.css'
import { GoSearch } from 'react-icons/go';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import NavbarSearch from './NavbarSearch';
import Cookies from 'js-cookie';
import ProfileDrop from './ProfileDrop';
import { useSelector } from 'react-redux';

const Navbar = () => {
    // Storing token to verifying login and logout
    const token = Cookies.get('CQ-token');
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const navigate = useNavigate();

    const [isHamOpen, setIsHamOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(0);
    const [isProfileDropOpen, setIsProfileDropOpen] = useState(false);

    const profileDropElem = useRef();
    const profileCircle = useRef();

    //close ham menu and drop menu if item clicked
    useEffect(() => {
        setIsHamOpen(false)
        setIsProfileDropOpen(false);
    }, [location])


    //  handing profile drop closing
    useEffect(() => {

        const handler = (event) => {
            // addied these conditions because of dual behaviour of drop down open
            if (isProfileDropOpen && !profileCircle?.current?.contains(event.target) && !profileDropElem?.current?.contains(event.target)) {
                setIsProfileDropOpen(false);
            }
        }

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        }
    })

    //handleProfileDrop
    const handleProfileDrop = () => {
        setIsProfileDropOpen(!isProfileDropOpen);
    }


    //closing actions of ham menu
    const hamRef = useRef();
    const hamCrossRef = useRef();

    useEffect(() => {
        const closeHandler = (event) => {
            if (!hamCrossRef?.current?.contains(event.target) && !hamRef?.current?.contains(event.target)) {
                setIsHamOpen(false);
            }
        }
        document.addEventListener("mousedown", closeHandler);

        return () => {
            document.addEventListener("mousedown", closeHandler);
        }
    });

    const handleHam = () => {
        setIsHamOpen(!isHamOpen);
    }

    // search related
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
                    ref={hamCrossRef}
                    onClick={() => handleHam()}
                    className={isHamOpen ? "ham-wrabox ham-open" : "ham-wrabox"}>
                    <div className='hamburger-line'></div>
                </div>
                <Link to='/'>
                    <div className="navbar-logo">
                        CODEQUERY
                        {/* <div className='navbar-logo-beta'>beta</div> */}
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
                                    onClick={handleProfileDrop}
                                    className='navbar-profile-circle'>
                                    <img src="https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png" alt="" />
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
                {isHamOpen ? <div
                    ref={hamRef}
                    className='ham-menu'>
                    <Link to='/'>
                        <div className={splitLocation[1] === "" || splitLocation[1] === "question" ? "home-col-item-active" : ""}>Home</div>
                    </Link>
                    <Link to='/write'>
                        <div className={splitLocation[1] === "write" ? "home-col-item-active" : ""}>Write</div>
                    </Link>
                    <Link to='/articles'>
                        <div className={splitLocation[1] === "articles" ? "home-col-item-active" : ""}>Articles</div>
                    </Link>
                    {
                        token === undefined ?
                            <>
                                <Link to='/login'>
                                    <div className={splitLocation[1] === "login" ? "home-col-item-active" : ""}>Login</div>

                                </Link>
                                <Link to='/signup'>
                                    <div className={splitLocation[1] === "signup" ? "home-col-item-active" : ""}>Signup</div>
                                </Link>
                            </> :
                            <Link to='/'>
                                <div className={splitLocation[1] === "about" ? "home-col-item-active" : ""}>About</div>
                            </Link>
                    }
                </div> : null}
            </div>
        </div >
    )
}

export default Navbar