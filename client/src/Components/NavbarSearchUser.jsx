import React, { useState, useRef, useEffect } from "react";
import { UserSearch } from "../actions/UserActions/UserSearch";
import M from "materialize-css";
import "../styles/NavbarSearchUser.css";
import UserPhoto from "./Home/Posts/UserPhoto";
import { useHistory } from "react-router-dom";

const NavbarSearchUser = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const addSearchModal = useRef(null);

  const history = useHistory()

  useEffect(() => {
    M.Modal.init(addSearchModal.current);
  }, []);

  const handleChange = async (query) => {
    setSearch(query);
    const result = await UserSearch(query);
    setResult(result);
  };

  return (
    <>
      <a
        className="left navsearch modal-trigger"
        data-target="add-search-modal"
      >
        <i className="material-icons left">search</i>Search
      </a>

      <a
        className="left searchicon modal-trigger"
        data-target="add-search-modal"
      >
        <i className="material-icons left ">search</i>
      </a>

      <div
        ref={addSearchModal}
        id="add-search-modal"
        className="modal searchmodal"
      >
        <div className="searchitem">
          <i className="material-icons prefix left">
            search <input placeholder="search" htmlFor="search" value={search}
            onChange={(e) => handleChange(e.target.value)} />
          </i>
        </div>
        {search !== "" && (
        <div className="search results">
          {result.map((item)=>(
            <a key={item.id} className="search-result-item card" onClick={()=>{
              M.Modal.getInstance(addSearchModal.current).close()
              history.push(`/profile/${item.userName}`)
            }}>
            <UserPhoto
              src={item.userDetails.profilePic}
              height="50px"
              width="50px"
            />
            {item.user}
            <div id="user-name">
              <span style={{fontWeight:"bold"}}>{item.userName}</span>
            </div>
          </a>
          ))}
        </div>
      )}
      </div>

    </>
    
  );
};

export default NavbarSearchUser;