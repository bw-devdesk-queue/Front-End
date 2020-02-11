import React from "react";
import {connect} from "react-redux";
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { getRole } from './../utils/utils';
import { logout } from '../actions/actions';

// Styles
const NavBar = styled.nav`
  // background-color: #FFA500;
  background-color: #444444;
  // margin-bottom: 2%;
  height: 70px;
  width: 100%;
  display: flex;
  flex-direction: raw;
  align-items: center;
  justify-content: space-around;
  font-size: 50px
  color: #D3D3D3 !important;
  font-weight: bold;
  transition: all 0.4s ease;
`
const Title=styled.h1`
  font-size: 3rem;
  text-transform: uppercase;
  letter-spacing: 2rem;
  color: orange;
  transition: all 0.4s ease;

  &:hover {
    color: #D3D3D3;
    transition: all 0.4s ease;
  }
`

const NavLinks = styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: space-around;
  width: 50%;
  
  @media (max-width: 800px) {
    font-size: 0.75rem;
  }
`

const LinkText = styled.p`
  color: #D3D3D3;
  transition: all 0.4s ease;

  &:hover {
    color: orange;
    transition: all 0.4s ease;
  }
`

const Header = (props) =>{
  const role = getRole(useLocation().pathname);
  return (
    <NavBar className="nav-bar">
        <Title>DevDesk</Title>
        <NavLinks>
          <NavLink to={`/${role}/tickets`}>
            <LinkText>
              Home
            </LinkText>
          </NavLink>
          <NavLink to="/login/user">
            <LinkText>
              Login
            </LinkText>
          </NavLink>
          <NavLink to="/Register/user">
            <LinkText>
              Register
            </LinkText>
          </NavLink>
          <NavLink to="/" onClick={logout}>
            <LinkText>
              Logout
            </LinkText>
          </NavLink>
        </NavLinks>
    </NavBar>
  );
};

const mapStateToProps=state=>{
  return state
}

export default connect(mapStateToProps, {logout}) (Header);
