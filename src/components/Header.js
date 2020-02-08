import React from "react";
import {connect} from "react-redux";
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { logout } from '../actions/actions';

const HeaderC = styled.nav`
background-color: #f5f5dc;
height: 70px;
width:100%;
display: flex;
flex-direction: raw;
align-items: center;
justify-content: space-around;
font-size: 50px
color: gray;
font-weight:bold

`
const Title=styled.h1`
  color:#726056;
  
`



const Header = (props) =>{

  
  return (
    <HeaderC className="nav-bar">
      
        <Title>Welcome to DevDesk</Title>
        <NavLink to="/user/tickets">Home</NavLink>
        <NavLink to="/login/user">Login</NavLink>
        <NavLink to="/Register/user">Register</NavLink>
        <NavLink to="/" onClick={logout}>Sign-out</NavLink>
      
      
    
    </HeaderC>
  );
};

const mapStateToProps=state=>{
  return state
}

export default connect(mapStateToProps, {logout}) (Header);
