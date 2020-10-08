import React from "react";
import "./App.css";
import NavBar from "./Components/Navbar";
import { Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import UserContextProvider from "./contexts/userContext";
import ConfirmEmail from "./pages/ConfirmEmail";
// import PostContextProvider from "./contexts/postContext";
import Reset from "./pages/Reset";
import NewPassword from "./pages/NewPassword";
import OtherUser from "./pages/OtherUser";
import EditProile from "./pages/EditProile";
// import DirectMessages from "./pages/DirectMessages";
import Inbox from "./pages/Inbox";
import Explore from "./pages/Explore";

function App() {
  return (
    <UserContextProvider>
      {/* <PostContextProvider> */}
      <NavBar />
      <div className="App">
        <div className="main">
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/confirm-otp" component={ConfirmEmail} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/reset/:token" component={NewPassword} />
          <Route exact path="/profile/:userName" component={Profile} />
          <Route exact path="/upload" component={CreatePost} />
          {/* <Route exact path="/profile/:userId" component={OtherUser} /> */}
          <Route exact path="/editprofile" component={EditProile} />
          <Route exact path="/chat" component={Inbox} />
          <Route exact path="/chat/:userId" component={Inbox} />
          <Route exact path="/explore" component={Explore} />
        </div>
      </div>
      {/* <Redirect to="/signin" /> */}
      {/* </PostContextProvider> */}
    </UserContextProvider>
  );
}

export default App;