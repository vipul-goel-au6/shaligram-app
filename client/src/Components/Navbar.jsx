import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import "../styles/Navbar.css";
import { UserContext } from "../contexts/userContext";
import { SignOut } from "../actions/authActions/SignOut";
import { useEffect } from "react";
import { useRef } from "react";
import UserPhoto from "./Home/Posts/UserPhoto";
import NavbarSearchUser from "./NavbarSearchUser";

const NavBar = () => {
  const history = useHistory();
  const { user, dispatch } = useContext(UserContext);
  const handleSignOut = () => {
    SignOut(dispatch);
    history.push("/signin");
  };

  const NavBarItems = () => {

    const navRef = useRef(null)

    useEffect(() => {
      M.Dropdown.init(navRef.current, { inDuration: 300, outDuration: 225 });
    },[]);

    if (user.user) {
      return (
        <>
          <li>
            <Link to="/upload">
              <i className="material-icons ">add_circle_outline</i>
            </Link>
          </li>
          <li>
            <Link to="/">
              <i className="material-icons black-text">home</i>
            </Link>
          </li>
          <li>
            <Link to="/chat">
              <i
                className="material-icons"
                style={{ transform: "rotate(-30deg)" }}
              >
                send
              </i>
            </Link>
          </li>
          <li>
            <Link to="/explore">
              <i className="material-icons ">explore</i>
            </Link>
          </li>
          <li>
            <a className="dropdown-trigger navphoto" data-target="profile-dropdown" ref={navRef}>
            <UserPhoto height="25px" width="25px"  src={user.user.userDetails.profilePic}/>
            </a>
            <ul id="profile-dropdown" className="dropdown-content dropitems">
              <li>
                <Link to={`/profile/${user.user.userName}`}>
                  <i className="material-icons text-white">account_circle</i>Profile
                </Link>
              </li>
              <li>
                <Link to="/editprofile">
                  <i className="material-icons text-white">settings</i>Settings
                </Link>
              </li>
              <li>
            <button 
              className="btn-flat  center #fafafa grey lighten-5 black-text signout"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </li>
            </ul>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/signin">SignIn</Link>
          </li>
        </>
      );
    }
  };
  return user.user ? (
    <div className="navbar-fixed">
    <nav>
      <div className="nav-wrapper white">
        <Link
          to={user.user ? "/" : "/signin"}
          className="brand-logo left mylogo"
        >
          Shaligram
        </Link>
        <NavbarSearchUser/>
        <ul id="nav-mobile" className="right">
          <NavBarItems />
        </ul>
      </div>
    </nav>
    </div>
  ) : (<div></div>);
};

export default NavBar;