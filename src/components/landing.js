import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import '../css/background_home.css';
import Register from './auth/Register';


class Landing extends Component {
  render() {
    return (
      <div id="background" style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Welcome to</b> our Social Media{" "}
            </h4>
            <p className="flow-text grey-text text-darken-1">
              MERN helps you connect and share with the people in your life
            </p>
            <br />

            <div className="col s6">
                <Link
                    to="/register"
                    style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                    Register
                </Link>
            </div>
            {/* <Route path={`/register`} component={Register}></Route> */}
            <div className="col s6">
                <Link
                    to="/login"
                    style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                    }}
                    className="btn btn-large btn-flat waves-effect white black-text"
                >
                    Log In
                </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;