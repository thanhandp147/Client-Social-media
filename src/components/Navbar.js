import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from '../assets/image/logo.png';
import '../css/navbar.css';
import { connect } from 'react-redux';
import { _logout } from '../actions/user'

class Navbar extends Component {
    
    _handleLogout = () => {
        const { _logout, history } = this.props;
        console.log({history});
        
        _logout(history);


    }
    render() {
        return (
            <>
                <header className="header">
                    <div className="d-flex align-items-center">
                        <Link to="/" className="header-brand mr-3">
                            <img src={logo} height="30" alt="Đồ án" className="header-logo" />
                        </Link>

                        <div className="vertical-line-nav"></div>

                        <div className="header-search-box">

                        </div>

                        <ul className="header-nav header-nav--main d-flex align-items-center list-unstyled ml-auto hide_mobile">
                            <li className="active-home">
                                <Link to="/">
                                    <i className="fas fa-home active" />
                                </Link>

                            </li>
                            <li>
                                <Link to="/">
                                    <i className="fas fa-user-friends" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <i className="fas fa-envelope" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <i className="fas fa-bell" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <i className="fas fa-cog" />
                                </Link>
                            </li>
                        </ul>
                        <ul className="header-nav header-nav-right d-flex align-items-center list-unstyled ml-auto hide_mobile">
                            <li><button className="btn btn-default btn_logout" onClick={() => this._handleLogout()}>Đăng xuất</button></li>
                        </ul>
                    </div>
                </header>
            </>
        );
    }
}

export default connect(null, { _logout })(Navbar);
