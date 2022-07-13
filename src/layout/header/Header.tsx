import React from "react";
import { Link } from "react-router-dom";
import '../../styles/header.css';
import { SearchOutlined, MailOutlined, BellOutlined, GithubOutlined } from "@ant-design/icons";

export const Header = () => {
    return(
        <div className="header">
            <Link to='/'>
            <div className="logo">
            </div> 
            </Link>
            
            <input type='text' className='search'/>
            <SearchOutlined className="searchicon"/>

            <MailOutlined  className="mailicon" />

            <BellOutlined className="bellicon" />

            <GithubOutlined className="giticon"/>
                
        </div>
    )
}