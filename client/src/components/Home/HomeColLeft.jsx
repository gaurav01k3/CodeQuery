import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Home/home-col-left.css';
import { useLocation } from "react-router-dom";
const HomeColLeft = () => {

    const location = useLocation();

    //destructuring pathname from location
    const { pathname } = location;


    const splitLocation = pathname.split("/");

    return (
        <div className="home-col-left">
            <div className="home-col-item-wrapper">
                <Link to='/'>
                    <div className={splitLocation[1] === "" || splitLocation[1] === "question" ? "home-col-item home-col-item-active" : "home-col-item"}>Home</div>
                </Link>
                <Link to='/write'>
                    <div className={splitLocation[1] === "write" ? "home-col-item home-col-item-active" : "home-col-item"}>Write</div>
                </Link>
                <Link to='/articles'>
                    <div className={splitLocation[1] === "articles" ? "home-col-item home-col-item-active" : "home-col-item"}>Articles</div>
                </Link>
                {/* <Link to='/'>
                    <div className={splitLocation[1] === "users" ? "home-col-item home-col-item-active" : "home-col-item"}>Users</div>
                </Link> */}
                <Link to='/'>
                    <div className={splitLocation[1] === "" ? "home-col-item" : "home-col-item"}>About</div>
                </Link>
            </div>
            <div className="home-col-left-policy">
                <div>
                    terms
                </div>
                <div>
                    policy
                </div>
            </div>
        </div >
    )
}

export default HomeColLeft