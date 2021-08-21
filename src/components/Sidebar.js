import React from 'react'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react';

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { getType } from '../routes';

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
                                <Link to="/"><img src="assets/images/favicon-admin.png" alt="Logo" srcSet="" height="500px" /></Link>
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
                                    <i className="bi bi-file-post"></i>
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
                                    <i className="bi bi-tags-fill"></i>
                                    <span>Categories</span>
                                </a>
                                <ul ref={categories} className="submenu">
                                    <li className="submenu-item ">
                                        <Link to="/categories/all">All Categories</Link>
                                    </li>
                                </ul>
                            </li>
                            {getType() === 'admin' && 
                            
                            <li 
                                className={activeMenu.roles !== undefined ? 'sidebar-item active' : 'sidebar-item'} 
                                onClick={() => handleSetActive('roles')}
                            >
                                <Link to="/users/change_role" className='sidebar-link'>
                                    <i className="bi bi-award-fill"></i>
                                    <span>Roles</span>
                                </Link>
                            </li>
                            }
                            <li 
                                className={activeMenu.allusers !== undefined ? 'sidebar-item active' : 'sidebar-item'} 
                                onClick={() => handleSetActive('allusers')}
                            >
                                <Link to="/users/all" className='sidebar-link'>
                                    <i className="bi bi-people-fill"></i>
                                    <span>All Users</span>
                                </Link>
                            </li>   
                            {getType() === 'admin' && 
                            <li 
                                className={activeMenu.moderator_requests !== undefined ? 'sidebar-item active' : 'sidebar-item'} 
                                onClick={() => handleSetActive('moderator_requests')}
                            >
                                <Link to="/moderator_request" className='sidebar-link'>
                                    <i className="bi bi-person-check-fill"></i>
                                    <span>Moderator Requests</span>
                                </Link>
                            </li>
                        }
                        {getType() === 'moderator' && 
                            <li 
                                className={activeMenu.instructor_requests !== undefined ? 'sidebar-item active' : 'sidebar-item'} 
                                onClick={() => handleSetActive('instructor_requests')}
                            >
                                <Link to="/instructor_request" className='sidebar-link'>
                                    <i className="bi bi-person-check-fill"></i>
                                    <span>Instructor Requests</span>
                                </Link>
                            </li>
                        }
                        {getType() === 'admin' &&
                        
                            <li 
                                className={activeMenu.website_info !== undefined ? 'sidebar-item active' : 'sidebar-item'} 
                                onClick={() => handleSetActive('website_info')}
                            >
                                <Link to="/website_info" className='sidebar-link'>
                                    <i className="bi bi-info-circle-fill"></i>
                                    <span>Website Info</span>
                                </Link>
                            </li>                 
                        }
                            
                            <li 
                                className='sidebar-item' 
                            >
                                <Link to="/logout" className='sidebar-link'>
                                <i className="bi bi-box-arrow-right"></i>
                                    <span>Logout</span>
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
