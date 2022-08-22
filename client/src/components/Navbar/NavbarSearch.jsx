import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { GoSearch } from 'react-icons/go';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import Loader from '../Loader/Loader';

const NavbarSearch = () => {


    const [focused, setFocused] = useState(false);
    const [query, setQuery] = useState("");
    console.log(query);
    const navigate = useNavigate();



    const isQueryNotEmpty = query.length > 0;
    const { data: questions, isLoading } = useQuery(['search_questions_', query],
        async () => {
            const res = await axios({
                method: 'get',
                url: `/api/v1/find?search=${query}`
            })
            return res.data;
        },
        {
            enabled: isQueryNotEmpty
        }
    )

    const handleClick = (_id) => {
        setQuery("");
        navigate(`/question/${_id}`);
    }


    const searchDropRef = useRef();

    useEffect(() => {
        const closeHandler = (event) => {
            if (!searchDropRef?.current?.contains(event.target)) {
                setQuery("");
            }
        }

        document.addEventListener('mousedown', closeHandler);

        return () => {
            document.addEventListener('mousedown', closeHandler);
        }
    })


    return (
        <div
            ref={searchDropRef}
            className="navbar-search">
            <div className={!focused ? 'navbar-search-input' : 'navbar-search-input navbar-search-transition'}>
                <div className='navbar-search-icon'>
                    <GoSearch fontSize={14} />
                </div>
                <input
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder='Search here...'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            {
                query.length > 0 ?
                    <div
                        className='navbar-search-drop'>

                        {
                            questions?.map((el) => {
                                return (
                                    <>
                                        <div className='navbar-search-drop-item-wrapper'>
                                            <div className='navbar-search-drop-Q'>Q</div>
                                            <div
                                                onClick={() => handleClick(el._id)}
                                                key={el._id}
                                                className="navbar-search-drop-item" >
                                                {el.title}
                                            </div>
                                        </div>
                                    </>)
                            })
                        }

                        {
                            isLoading ?
                                <div
                                    className="navbar-search-drop-item search-no-results" >
                                    Searching...
                                </div>
                                : null
                        }

                        {
                            questions?.length === 0 ?

                                <div
                                    className="navbar-search-drop-item search-no-results" >
                                    No results found !!
                                </div>
                                : null
                        }
                    </div>
                    :
                    null
            }

        </div >
    )
}

export default NavbarSearch