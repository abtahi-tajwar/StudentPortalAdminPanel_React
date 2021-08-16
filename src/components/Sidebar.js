import React from 'react'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react';

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

function Sidebar() {
    const posts = useRef()
    const categories = useRef()

    const [activeMenu, setActiveMenu] = useState({
        dashboard: true
    });

    const handleScrollbarSubmenu = (elem) => {
        elem.current.classList.toggle('active')
    }

    const handleSetActive = (menu) => {
        setActiveMenu({
            [menu]: true
        })
    }
    
    

    return (
        <PerfectScrollbar>
            <div id="sidebar" className="active">
                <div className="sidebar-wrapper active">
                    <div className="sidebar-header">
                        <div className="d-flex justify-content-between">
                            <div className="logo">
                                <a href="index.html"><img src="assets/images/logo/logo.png" alt="Logo" srcSet="" /></a>
                            </div>
                            <div className="toggler">
                                <a href="#" className="sidebar-hide d-xl-none d-block"><i className="bi bi-x bi-middle"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar-menu">
                        <ul className="menu">
                            <li className="sidebar-title">Menu</li>

                            <li 
                                className={activeMenu.dashboard !== undefined ? 'sidebar-item active' : 'sidebar-item'} 
                                onClick={() => handleSetActive('dashboard')}
                            >
                                <Link to="/" className='sidebar-link'>
                                    <i className="bi bi-grid-fill"></i>
                                    <span>Dashboard</span>
                                </Link>
                            </li>

                            <li className="sidebar-item  has-sub" onClick={() => handleScrollbarSubmenu(posts)}>
                                <a href="#" className='sidebar-link'>
                                    <i class="bi bi-file-post"></i>
                                    <span>Posts</span>
                                </a>
                                <ul ref={posts} className="submenu">
                                    <li className="submenu-item ">
                                        <Link to="/posts/all">All Posts</Link>
                                    </li>
                                    <li className="submenu-item ">
                                        <Link to="/posts/create">Create Post</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="sidebar-item  has-sub" onClick={() => handleScrollbarSubmenu(categories)}>
                                <a href="#" className='sidebar-link'>
                                    <i class="bi bi-tags-fill"></i>
                                    <span>Categories</span>
                                </a>
                                <ul ref={categories} className="submenu">
                                    <li className="submenu-item ">
                                        <Link to="/categories/all">All Categories</Link>
                                    </li>
                                    <li className="submenu-item ">
                                        <Link to="/">Badge</Link>
                                    </li>
                                </ul>
                            </li>
                            <li 
                                className={activeMenu.roles !== undefined ? 'sidebar-item active' : 'sidebar-item'} 
                                onClick={() => handleSetActive('roles')}
                            >
                                <Link to="/users/change_role" className='sidebar-link'>
                                    <i class="bi bi-award-fill"></i>
                                    <span>Roles</span>
                                </Link>
                            </li>
                            <li 
                                className={activeMenu.allusers !== undefined ? 'sidebar-item active' : 'sidebar-item'} 
                                onClick={() => handleSetActive('allusers')}
                            >
                                <Link to="/users/all" className='sidebar-link'>
                                    <i class="bi bi-people-fill"></i>
                                    <span>All Users</span>
                                </Link>
                            </li>   
                            <li 
                                className={activeMenu.moderator_requests !== undefined ? 'sidebar-item active' : 'sidebar-item'} 
                                onClick={() => handleSetActive('moderator_requests')}
                            >
                                <Link to="/users/all" className='sidebar-link'>
                                    <i class="bi bi-person-check-fill"></i>
                                    <span>Moderator Requests</span>
                                </Link>
                            </li>
                            <li 
                                className={activeMenu.website_info !== undefined ? 'sidebar-item active' : 'sidebar-item'} 
                                onClick={() => handleSetActive('website_info')}
                            >
                                <Link to="/users/all" className='sidebar-link'>
                                    <i class="bi bi-info-circle-fill"></i>
                                    <span>Website Info</span>
                                </Link>
                            </li>
                            <li 
                                className={activeMenu.privacy_policy !== undefined ? 'sidebar-item active' : 'sidebar-item'} 
                                onClick={() => handleSetActive('privacy_policy')}
                            >
                                <Link to="/users/all" className='sidebar-link'>
                                    <i class="bi bi-file-earmark-lock-fill"></i>
                                    <span>Privacy Policy</span>
                                </Link>
                            </li>                   

                        </ul>
                    </div>
                    <button className="sidebar-toggler btn x"><i data-feather="x"></i></button>
                </div>
            </div>
        </PerfectScrollbar>
    )
}




export default Sidebar
