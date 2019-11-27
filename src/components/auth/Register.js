import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from 'axios';
import '../../css/error__item.css';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom'
import Login from '../auth/Login';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

class Register extends Component {
    constructor() {
        super();
        this.state = {
            fullname: "",
            email: "",
            username: "",
            password: "",
            password2: "",
            errors: [],
            redirect: false
        };
    }

    onChange = e => {


        this.setState({ [e.target.id]: e.target.value });


    };
    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            fullname: this.state.fullname,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2
        };

        axios({
            method: 'post',
            // url: 'http://localhost:3000/register',
            url: 'https://socialnetwork113.herokuapp.com/register',
            data: newUser
        })
            .then(response => {
                if (response.status == 200) {
                    this.setState({
                        errors: response.data
                    })
                    console.log(this.state.errors);
                } else if (response.status == 201) {
                    alert('Register susscess');
                    this.setState({
                        redirect: true
                    })
                    


                }

            })
            .catch(function (error) {
                console.log(error);
            });


    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/login' />
        }
    }


    render() {
        const { errors } = this.state;

        return (

            <div className="container">
                <div>
                    {this.renderRedirect()}
                </div>
                <div className="row">
                    <div className="col s8 offset-s2">

                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to
                            home
                            </Link>

                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Register</b> below
                            </h4>
                            <p className="grey-text text-darken-1">
                                Already have an account? <Link to="/login">Log in</Link>
                            </p>
                        </div>
                        {/* FORM HERE */}
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.fullname}
                                    error={errors.fullname}
                                    id="fullname"
                                    type="text"
                                />
                                <label htmlFor="fullname">Fullname</label>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.username}
                                    error={errors.username}
                                    id="username"
                                    type="text"
                                />
                                <label htmlFor="username">Username</label>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                />
                                <label htmlFor="password2">Confirm Password</label>
                            </div>


                            <ul>
                                {errors.map(error =>
                                    <li className="error__item" key={error}>{error}</li>
                                )}

                            </ul>



                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register