// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/layout/Navbar.scss';

const Navbar = () => {
 return (
  <nav className='navbar'>
   <ul className='navbar__list'>
    <li className='navbar__item'>
     <Link to='/' className='navbar__link'>
      Posts
     </Link>
    </li>
   </ul>
  </nav>
 );
};

export default Navbar;
