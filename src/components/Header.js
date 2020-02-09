import React from "react";
import {connect} from "react-redux";
import { NavLink } from 'react-router-dom';
import { logout } from '../actions/actions';
import {HeaderC, Title} from "./Styles/StyleWidgets"




const Header = (props) =>{

  
  return (
    <HeaderC className="nav-bar">
      
        <Title>Welcome to DevDesk</Title>
        <NavLink to="/user/tickets">Home</NavLink>
        <NavLink to="/login/user">Login</NavLink>
        <NavLink to="/Register/user">Register</NavLink>
        <NavLink to="/">Sign-out</NavLink>
      
      
    
    </HeaderC>
  );
};

const mapStateToProps=state=>{
  return state
}

export default connect(mapStateToProps, {logout}) (Header);
