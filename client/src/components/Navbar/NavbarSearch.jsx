import React from 'react'
import { GoSearch } from 'react-icons/go';

const NavbarSearch = () => {


    const [focused, setFocused] = React.useState(false);

    return (
        <div className="navbar-search">
            <div className={!focused ? 'navbar-search-input' : 'navbar-search-input navbar-search-transition'}>
                <div className='navbar-search-icon'>
                    <GoSearch fontSize={14} />
                </div>
                <input
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    type="text" placeholder='Search here...' />
            </div>
        </div>
    )
}

export default NavbarSearch