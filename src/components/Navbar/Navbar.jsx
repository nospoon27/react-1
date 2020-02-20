import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from 'react-router-dom';

function Navbar() {
  return (
    <nav className={s.nav}>
      <NavLink className={s.item} to='/profile' activeClassName={s.activeLink}>
        Profile
      </NavLink>
      <NavLink className={s.item} to='/dialogs' activeClassName={s.activeLink}>
        Messages
      </NavLink>
      <NavLink className={s.item} to='/news' activeClassName={s.activeLink}>
        News
      </NavLink>
      <NavLink className={s.item} to='/music' activeClassName={s.activeLink}>
        Music
      </NavLink>
      <NavLink className={s.item} to='/settings' activeClassName={s.activeLink}>
        Settings
      </NavLink>
    </nav>
  );
}

export default Navbar;