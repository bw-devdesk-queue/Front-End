import React from "react";
import {connect} from "react-redux"
import styled from 'styled-components';

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

  const logout= ()=>{
    return localStorage.removeItem("token")
  }
  
  return (
    <HeaderC className="nav-bar">
      
        <Title>Welcome to DevDesk</Title>
        <a href="/user/tickets">Home</a>
        <a href="/login/user">Login</a>
        <a href="/Register/user">Register</a>
        <a href="/" onClick={logout}>Sign-out</a>
      
      
    
    </HeaderC>
  );
};

const mapStateToProps=state=>{
  return state
}

export default connect(mapStateToProps,{}) (Header);
