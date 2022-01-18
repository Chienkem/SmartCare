import React from 'react'
import styled from "styled-components";
import { Badge } from 'antd';
import 'antd/dist/antd.css';
import { BarsOutlined, LoginOutlined, BellOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import {dashboardWithoutSidebarRoutes} from './routers/index';
import { useLocation } from 'react-router-dom';
    
const NavbarContainer = styled.div`
    padding: 0 20px 0 20px;
    background-color: #262f3d;
    border-bottom: 1px solid #E5E9F2;
    display:flex;
    justify-content: space-between;
    color:white;
    height:50px;
`
const Left = styled.div`
display: flex;
align-items: center;
`
const Icon = styled.div`
cursor:pointer;
`
const MenuTitle = styled.div`
    font-weight: 400;
    margin:0 0 0 20px;
    color:white;
    font-size:16px;
`
const Right = styled.div`
display: flex;
align-items: center;
`
const LogOutContainer = styled.div`
margin-left: 20px;
display: flex;
align-items: center;
cursor: pointer;
`
const LogOutTitle = styled.div`
padding-left: 10px;
font-weight: 400;
color:white;
font-size:15px;
margin:0;
`

const Navbar = (props) => {

    const location = useLocation();         // lấy đường dẫn hiện tại

    const handleShowSidebar = () => {
        props.functionShowSidebar();
    }

    return (
       <NavbarContainer >
            <Left>
                <Icon onClick={() => handleShowSidebar()}>
                    <BarsOutlined style={{fontSize: "25px"}}/>
                </Icon>
                {
                    dashboardWithoutSidebarRoutes.map(({path, name}, i) => (
                        path === location.pathname && 
                        <MenuTitle className="m-0 text-white" key={i}>{name}</MenuTitle>
                    ))
                }
                
            </Left>
            <Right>
                <Icon>
                    <Badge  size="small" count="5">
                        <BellOutlined style={{fontSize: "25px", color:"#fff"}}/>
                    </Badge>
                </Icon>
                <LogOutContainer
                    onClick={()=>{
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }}
                >
                    <Icon>
                        <LoginOutlined style={{fontSize: "20px"}}/>
                    </Icon>
                    <LogOutTitle>Đăng Xuất</LogOutTitle>
                </LogOutContainer>
            </Right>
       </NavbarContainer>
    )
}

export default Navbar