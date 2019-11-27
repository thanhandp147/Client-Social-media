import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            errors: []
        }
    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })


    }

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            usernameLogin: this.state.username,
            passwordLogin: this.state.password
        }

        axios({
            method: 'post',
            // url: 'http://localhost:3000/login',
            url: 'https://socialnetwork113.herokuapp.com/login',
            data: userData
        })
            .then(response=> {

                if(response.status==200){
                    
                    console.log(response.data); // 'sai ten dang nhap'
                    
                    this.setState({
                        errors: response.data
                    })
                    
                    
                }else if(response.status==201){
                    
                    
                    this.setState({
                        errors: response.data
                    })
                }else if(response.status==202){
                    alert('Dang Nhap thanh cong')
                }else if(response.status==203){
                    this.setState({
                        errors: response.data //[]
                    })       
                }
                

            })
            .catch(function (error) {
                console.log(error);
                alert('login fail')
            });
    }



    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to
                            home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Login</b> below
                            </h4>
                            <p className="grey-text text-darken-1">
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
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
                                    Login
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}