import React, { Component } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

import Index from "./Components/IndexComponent";
import Create from "./Components/CreateComponent";
import Edit from "./Components/EditComponent";
import Watch from "./Components/WatchComponent";

const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    const { user, signOut, signInWithGoogle } = this.props;
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={"/"} className="navbar-brand">
              Movie Manager
            </Link>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/"} className="nav-link">
                    รายการภาพยนตร์
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/create"} className="nav-link">
                    เพิ่มภาพยนตร์
                  </Link>
                </li>
              </ul>
            </div>
            {user ? <span>สวัสดี, {user.displayName} </span> : <span></span>}

            {user ? (
              <button className="btn btn-primary" onClick={signOut}>Sign out</button>
            ) : (
              <button className="btn btn-primary" onClick={signInWithGoogle}>เข้าสู่ระบบด้วย Google</button>
            )}
          </nav>
          <br />
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/edit/:id" component={Edit} />
            <Route exact path="/create" component={Create} />
            <Route path="/watch/:id" component={Watch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
