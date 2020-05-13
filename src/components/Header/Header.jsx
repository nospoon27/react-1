import React from "react";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";

function Header(props) {
  return (
    <header className={s.header}>
      <img src="https://pngimg.com/uploads/lego/lego_PNG85.png" alt="Logo" />
      <div className={s.loginBlock}>
        {props.isAuth ? props.login : <NavLink to={"/login"}>Login</NavLink>}
      </div>
    </header>
  );
}

export default Header;