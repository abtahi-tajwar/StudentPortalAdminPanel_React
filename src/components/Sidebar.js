import React from 'react'

function Sidebar() {
    return (
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

                        <li className="sidebar-item active ">
                            <a href="index.html" className='sidebar-link'>
                                <i className="bi bi-grid-fill"></i>
                                <span>Dashboard</span>
                            </a>
                        </li>

                        <li className="sidebar-item  has-sub">
                            <a href="#" className='sidebar-link'>
                                <i className="bi bi-stack"></i>
                                <span>Components</span>
                            </a>
                            <ul className="submenu ">
                                <li className="submenu-item ">
                                    <a href="component-alert.html">Alert</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-badge.html">Badge</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-breadcrumb.html">Breadcrumb</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-button.html">Button</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-card.html">Card</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-carousel.html">Carousel</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-dropdown.html">Dropdown</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-list-group.html">List Group</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-modal.html">Modal</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-navs.html">Navs</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-pagination.html">Pagination</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-progress.html">Progress</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-spinner.html">Spinner</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-tooltip.html">Tooltip</a>
                                </li>
                            </ul>
                        </li>

                        <li className="sidebar-item  has-sub">
                            <a href="#" className='sidebar-link'>
                                <i className="bi bi-collection-fill"></i>
                                <span>Extra Components</span>
                            </a>
                            <ul className="submenu ">
                                <li className="submenu-item ">
                                    <a href="extra-component-avatar.html">Avatar</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="extra-component-sweetalert.html">Sweet Alert</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="extra-component-toastify.html">Toastify</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="extra-component-rating.html">Rating</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="extra-component-divider.html">Divider</a>
                                </li>
                            </ul>
                        </li>

                        <li className="sidebar-item  has-sub">
                            <a href="#" className='sidebar-link'>
                                <i className="bi bi-grid-1x2-fill"></i>
                                <span>Layouts</span>
                            </a>
                            <ul className="submenu ">
                                <li className="submenu-item ">
                                    <a href="layout-default.html">Default Layout</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="layout-vertical-1-column.html">1 Column</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="layout-vertical-navbar.html">Vertical with Navbar</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="layout-horizontal.html">Horizontal Menu</a>
                                </li>
                            </ul>
                        </li>

                        <li className="sidebar-title">Forms &amp; Tables</li>

                        <li className="sidebar-item  has-sub">
                            <a href="#" className='sidebar-link'>
                                <i className="bi bi-hexagon-fill"></i>
                                <span>Form Elements</span>
                            </a>
                            <ul className="submenu ">
                                <li className="submenu-item ">
                                    <a href="form-element-input.html">Input</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="form-element-input-group.html">Input Group</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="form-element-select.html">Select</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="form-element-radio.html">Radio</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="form-element-checkbox.html">Checkbox</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="form-element-textarea.html">Textarea</a>
                                </li>
                            </ul>
                        </li>

                        <li className="sidebar-item  ">
                            <a href="form-layout.html" className='sidebar-link'>
                                <i className="bi bi-file-earmark-medical-fill"></i>
                                <span>Form Layout</span>
                            </a>
                        </li>

                        <li className="sidebar-item  has-sub">
                            <a href="#" className='sidebar-link'>
                                <i className="bi bi-pen-fill"></i>
                                <span>Form Editor</span>
                            </a>
                            <ul className="submenu ">
                                <li className="submenu-item ">
                                    <a href="form-editor-quill.html">Quill</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="form-editor-ckeditor.html">CKEditor</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="form-editor-summernote.html">Summernote</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="form-editor-tinymce.html">TinyMCE</a>
                                </li>
                            </ul>
                        </li>

                        <li className="sidebar-item  ">
                            <a href="table.html" className='sidebar-link'>
                                <i className="bi bi-grid-1x2-fill"></i>
                                <span>Table</span>
                            </a>
                        </li>

                        <li className="sidebar-item  ">
                            <a href="table-datatable.html" className='sidebar-link'>
                                <i className="bi bi-file-earmark-spreadsheet-fill"></i>
                                <span>Datatable</span>
                            </a>
                        </li>

                        <li className="sidebar-title">Extra UI</li>

                        <li className="sidebar-item  has-sub">
                            <a href="#" className='sidebar-link'>
                                <i className="bi bi-pentagon-fill"></i>
                                <span>Widgets</span>
                            </a>
                            <ul className="submenu ">
                                <li className="submenu-item ">
                                    <a href="ui-widgets-chatbox.html">Chatbox</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="ui-widgets-pricing.html">Pricing</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="ui-widgets-todolist.html">To-do List</a>
                                </li>
                            </ul>
                        </li>

                        <li className="sidebar-item  has-sub">
                            <a href="#" className='sidebar-link'>
                                <i className="bi bi-egg-fill"></i>
                                <span>Icons</span>
                            </a>
                            <ul className="submenu ">
                                <li className="submenu-item ">
                                    <a href="ui-icons-bootstrap-icons.html">Bootstrap Icons </a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="ui-icons-fontawesome.html">Fontawesome</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="ui-icons-dripicons.html">Dripicons</a>
                                </li>
                            </ul>
                        </li>

                        <li className="sidebar-item  has-sub">
                            <a href="#" className='sidebar-link'>
                                <i className="bi bi-bar-chart-fill"></i>
                                <span>Charts</span>
                            </a>
                            <ul className="submenu ">
                                <li className="submenu-item ">
                                    <a href="ui-chart-chartjs.html">ChartJS</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="ui-chart-apexcharts.html">Apexcharts</a>
                                </li>
                            </ul>
                        </li>

                        <li className="sidebar-item  ">
                            <a href="ui-file-uploader.html" className='sidebar-link'>
                                <i className="bi bi-cloud-arrow-up-fill"></i>
                                <span>File Uploader</span>
                            </a>
                        </li>

                        <li className="sidebar-item  has-sub">
                            <a href="#" className='sidebar-link'>
                                <i className="bi bi-map-fill"></i>
                                <span>Maps</span>
                            </a>
                            <ul className="submenu ">
                                <li className="submenu-item ">
                                    <a href="ui-map-google-map.html">Google Map</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="ui-map-jsvectormap.html">JS Vector Map</a>
                                </li>
                            </ul>
                        </li>

                        <li className="sidebar-title">Pages</li>

                        <li className="sidebar-item  ">
                            <a href="application-email.html" className='sidebar-link'>
                                <i className="bi bi-envelope-fill"></i>
                                <span>Email Application</span>
                            </a>
                        </li>

                        <li className="sidebar-item  ">
                            <a href="application-chat.html" className='sidebar-link'>
                                <i className="bi bi-chat-dots-fill"></i>
                                <span>Chat Application</span>
                            </a>
                        </li>

                        <li className="sidebar-item  ">
                            <a href="application-gallery.html" className='sidebar-link'>
                                <i className="bi bi-image-fill"></i>
                                <span>Photo Gallery</span>
                            </a>
                        </li>

                        <li className="sidebar-item  ">
                            <a href="application-checkout.html" className='sidebar-link'>
                                <i className="bi bi-basket-fill"></i>
                                <span>Checkout Page</span>
                            </a>
                        </li>

                        <li className="sidebar-item  has-sub">
                            <a href="#" className='sidebar-link'>
                                <i className="bi bi-person-badge-fill"></i>
                                <span>Authentication</span>
                            </a>
                            <ul className="submenu ">
                                <li className="submenu-item ">
                                    <a href="auth-login.html">Login</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="auth-register.html">Register</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="auth-forgot-password.html">Forgot Password</a>
                                </li>
                            </ul>
                        </li>

                        <li className="sidebar-item  has-sub">
                            <a href="#" className='sidebar-link'>
                                <i className="bi bi-x-octagon-fill"></i>
                                <span>Errors</span>
                            </a>
                            <ul className="submenu ">
                                <li className="submenu-item ">
                                    <a href="error-403.html">403</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="error-404.html">404</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="error-500.html">500</a>
                                </li>
                            </ul>
                        </li>

                        <li className="sidebar-title">Raise Support</li>

                        <li className="sidebar-item  ">
                            <a href="https://zuramai.github.io/mazer/docs" className='sidebar-link'>
                                <i className="bi bi-life-preserver"></i>
                                <span>Documentation</span>
                            </a>
                        </li>

                        <li className="sidebar-item  ">
                            <a href="https://github.com/zuramai/mazer/blob/main/CONTRIBUTING.md" className='sidebar-link'>
                                <i className="bi bi-puzzle"></i>
                                <span>Contribute</span>
                            </a>
                        </li>

                        <li className="sidebar-item  ">
                            <a href="https://github.com/zuramai/mazer#donate" className='sidebar-link'>
                                <i className="bi bi-cash"></i>
                                <span>Donate</span>
                            </a>
                        </li>

                    </ul>
                </div>
                <button className="sidebar-toggler btn x"><i data-feather="x"></i></button>
            </div>
        </div>
    )
}

export default Sidebar
