import React, { useState } from 'react'
import UserNavbar from './UserNavbar'
import { Link, Outlet } from 'react-router-dom'
import "../../assets/logo.png"

const UserSidebar = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
    const toggleSidebar = () => {
      console.log("toggleSidebar");
      setSidebarOpen(!isSidebarOpen);
    };
  return (
    <>
    <UserNavbar toggleSidebar={toggleSidebar} />
    <aside
    className={`app-sidebar bg-body  shadow ${isSidebarOpen ? "open" : "d-none"}`}
    data-bs-theme="dark"
  >
    <div className="sidebar-brand" style={{padding: "40px"}}>
      
      <Link to="/user" className="brand-link">
        
        <img
          src="../../assets/logo.png"
          alt=""
          className="brand-image opacity-75 shadow"
        />
        
        <span className="brand-text fw-light">Web Wear</span>
        
      </Link>
      
    </div>

    <div
      className=""
      data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
      tabIndex={-1}
      style={{
        marginRight: "-16px",
        marginBottom: "-16px",
        marginLeft: 0,
        top: "-8px",
        right: "auto",
        left: "-8px",
        width: "calc(100% + 16px)",
        padding: 8,
      }}
    >
      <nav className="mt-2">
        
        <ul
          className="nav sidebar-menu flex-column"
          data-lte-toggle="treeview"
          role="menu"
          data-accordion="false"
        >
          <li className="nav-item menu-open">
            <Link to="userdashboard" className="nav-link active">
              <i className="nav-icon bi bi-speedometer" />
              <p>
                Home
                <i className="nav-arrow bi bi-chevron-right" />
              </p>
            </Link>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to="userorder" className="nav-link">
                  <i className="nav-icon bi bi-circle" />
                  <p>Orders</p>
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link to="usercart" className="nav-link">
              <i className="nav-icon bi bi-palette" />
              <p>Cart</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="wishlist" className="nav-link">
              <i className="nav-icon bi bi-palette" />
              <p>WistList</p>
            </Link>
          </li>
       
           <li className="nav-item">
                <Link to="profile" className="nav-link">
                  <i className="nav-icon bi bi-circle" />
                  <p>User Profile</p>
                </Link>
              </li>
            
        
        
        </ul>
        
      </nav>
    </div>
  </aside>
  <main className='app-main'>
    <Outlet></Outlet>
  </main>
    </>
  )
}

export default UserSidebar
