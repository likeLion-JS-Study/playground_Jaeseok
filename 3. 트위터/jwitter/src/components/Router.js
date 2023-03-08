import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from 'routes/Home';
import Auth from 'routes/Auth';
import Profile from 'routes/Profile';
import Navigation from 'components/Navigation';
const AppRouter = ({isLoggedIn, userObj, refreshUser }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <div>
        <Routes>
          {isLoggedIn ? (
            <React.Fragment
              style={{
                maxWidth: 890,
                width: "100%",
                margin: "0 auto",
                marginTop: 80,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Route exact path="/" element={<Home userObj={userObj} />} />
              <Route exact path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
            </React.Fragment>
          ): (
            <Route exact path = "/" element = {<Auth />}/>
          )}
        </Routes>
      </div>
    </Router>
  )
}

export default AppRouter;