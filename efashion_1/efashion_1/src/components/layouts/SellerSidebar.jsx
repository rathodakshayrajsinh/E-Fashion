import React, { useState } from 'react'
import SellerNavbar from '../layouts/SellerNavbar'
import { Link, Outlet } from 'react-router-dom'
import logo from "../../assets/logo.png"


const SellerSidebar = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    console.log("toggleSidebar");
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
    <SellerNavbar toggleSidebar={toggleSidebar} />
    <aside
    className={`app-sidebar bg-body shadow ${isSidebarOpen ? "open" : "d-none"}`}
    data-bs-theme="dark"
  >
    <div className="sidebar-brand" style={{padding: "40px"}}>
      
      <Link to="/user" className="brand-link">
        
        <img
          src={logo}
          alt=""
          className="brand-image opacity-75 shadow"
        />
        
        <span className="brand-text fw-light">E-Fashion</span>
        
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
            <Link to="dashboard" className="nav-link active">
              <i className="nav-icon bi bi-speedometer" />
              <p>
                Dashboard
                <i className="nav-arrow bi bi-chevron-right" />
              </p>
            </Link>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to="product" className="nav-link active">
                  <i className="nav-icon bi bi-circle" />
                  <p>Add Product</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="productlist" className="nav-link">
                  <i className="nav-icon bi bi-circle" />
                  <p>Products List</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="order" className="nav-link">
                  <i className="nav-icon bi bi-circle" />
                  <p>Orders</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="sellerprofile" className="nav-link">
                  <i className="nav-icon bi bi-circle" />
                  <p>SellerProfile</p>
                </Link>
              </li>
            </ul>
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

export default SellerSidebar
