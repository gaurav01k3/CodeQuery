import React from 'react';
import { Link } from 'react-router-dom';

const WriteCard = ({ value }) => {

    return (
        <div className='write-card-wrapper'>
            <div className="write-card-head">
                {value.head}
            </div>
            <div className="write-card-content">
                {value.subHead}
            </div>
            <Link to={value.route}>
                <div className="write-card-button">
                    {value.action}
                </div>
            </Link>
        </div>
    )
}

export default WriteCard