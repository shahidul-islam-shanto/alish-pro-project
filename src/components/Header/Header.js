import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.png';
import { UseContext } from '../LogIn/Context';
import './Header.css';

const Header = () => {
    const [logInUser, setLogInUser] = useContext(UseContext)
    return (
        <div className="header">
            <img className="logo" src={logo} alt="" />
            <nav>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/review">Order Review</NavLink>
                <NavLink to="/inventory">Manage Inventory</NavLink>
                <button onClick={() => setLogInUser({})} className='btn-area'>Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;