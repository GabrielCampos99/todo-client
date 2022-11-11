import { Link } from "react-router-dom"
import styled from "styled-components"
import { FiX } from "react-icons/fi"
import { SidebarData } from "../../constants/SidebarData"
import { FiLogOut } from "react-icons/fi"
import React from "react"
import { TAuthContext, AuthContext } from "../../Context/AuthContext"

type NavbarProps = {
  sidebar?: boolean
  setSidebar?: (obj: any) => void
}

export const Navbar = ({ sidebar = true, setSidebar }: NavbarProps) => {
  const { handleLogout } = React.useContext(AuthContext) as TAuthContext

  return (
    <NavWrapper>
      <div className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle" onClick={() => setSidebar && setSidebar(!sidebar)}>
            <Link to="#" className="menu-bars">
              <FiX color="#cecece" />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName ? item.cName : "nav-text"}>
                <Link to={item.path ? item?.path : ""}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
          <li className={"logout nav-text"}>
            <a onClick={handleLogout}>
              <FiLogOut color="#ff4949" />
              <span>Sair</span>
            </a>
          </li>
        </ul>
      </div>
    </NavWrapper>
  )
}

export const NavWrapper = styled.nav`
  .navbar {
    background-color: #363636;
    height: 80px;
    display: flex;
    justify-content: start;
    align-items: center;
  }

  .menu-bars {
    margin-left: 2rem;
    font-size: 2rem;
    background: none;
  }

  .nav-menu {
    background-color: #363636;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: -100%;
    transition: 850ms;
    z-index: 9999;
  }

  .nav-menu.active {
    left: 0;
    transition: 350ms;
    border-right: 1px solid #8687e7;
    z-index: 9999;
  }

  .nav-text {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px 0px 8px 16px;
    list-style: none;
    height: 60px;
  }

  .nav-text a {
    text-decoration: none;
    color: #cecece;
    font-size: 18px;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 4px;
  }

  .nav-text a:hover {
    background-color: #1a83ff;
  }

  .nav-menu-items {
    width: 100%;
  }

  .navbar-toggle {
    background-color: #363636;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: start;
    align-items: center;
  }

  span {
    margin-left: 16px;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  .logout {
    span {
      color: #ff4949 !important;
    }
  }
`
