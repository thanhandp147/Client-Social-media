import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _logout } from '../actions/user'
import { _updateAvatar } from '../actions/user'
import { Link } from 'react-router-dom';
import '../css/home.css'
import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import Post_Layout from '../components/post'
import Overview from '../components/Overview'
import NavBar from '../components/Navbar'
import UserOnline from './UserOnline'
import { relative } from 'path';
import '../css/imageAvatar.css'
// import socketIOClient from 'socket.io-client'

let uirGetImageHeroku = 'http://localhost:3000/get_avatar/';
class Home extends Component {

    state = {
        avatar: null
    }

    _handleLogout = () => {
        const { _logout, history } = this.props;
        _logout(history);


    }
    _handleChangeFile = e => {
        this.setState({
            avatar: e.target.files[0]
        })


    }
    _handleSubmit = e => {
        // e.preventDefault();
        const { avatar } = this.state
        const { _updateAvatar } = this.props
        _updateAvatar(avatar);

        // _updateAvatar(this.state.avatar)

    }

    render() {
        // let {match}=this.props;
        // console.log({match:{params}});

        // const photoURL = this.props.user.infoUser.url
        //     ? `https://socialnetwork113.herokuapp.com/get_avatar/${this.props.user.infoUser.url}`
        //     : `https://socialnetwork113.herokuapp.com/get_avatar/default.png`
        // const photoURL = this.props.user.infoUser.url
        //     ? `http://localhost:3000/get_avatar/${this.props.user.infoUser.url}`
        //     : `http://localhost:3000/get_avatar/default.png`
        return (
            <div>

                <NavBar history={this.props.history} />
                <div className="main-theme row">
                    <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 col-aside" >
                        <div className="aside-wrapper shadow-sm">
                            <Overview />
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <div className="row justify-content-center">
                            <Post_Layout />
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 col-aside" style={{ position: "relative" }}>
                        <div className="aside-wrapper shadow-sm " style={{ position: "fixed" }}>
                            <div className="profile-content " >
                                <UserOnline/>
                            </div>
                        </div>
                    </div>
                </div>



                {/* <div className="main-theme row">
                    <div className="row profile">
                        <div className="col-md-3">
                            <Overview/>
                            
                        </div>

                        <div className="col-md-6">
                                <Post_Layout/>
                        </div>

                        <div className="col-md-3">
                            <div className="profile-content">
                                Some user related content goes here...
                            </div>
                        </div>

                    </div>
                </div> */}

            </div>



        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps, { _logout, _updateAvatar })(Home);