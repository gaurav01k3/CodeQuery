import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import '../styles/Bookmark/bookmark.css'

const Bookmarks = () => {

    const user = useSelector((state) => state.userDetails.existingUser);

    const { data: userData } = useQuery(
        'user' + user._id,
        async () => {
            const res = await axios({
                method: 'get',
                url: `/api/v1/user-profile/${user._id}`
            })
            return res.data;
        }
    )

    console.log(userData);

    return (
        <div className="home-col-2">

        </div>
    )
}

export default Bookmarks