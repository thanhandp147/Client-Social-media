import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _logout } from '../actions/user'
import { Link } from 'react-router-dom';
import { _updatePassword } from '../actions/user'

class Update_Password extends Component {
    constructor() {
        super();
        this.state = {
            password1: '',
            password2: '',
            errors: []
        }
    }

    onChange= (e)=>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();
        const { password1, password2 } = this.state;
        const { _updatePassword, history }= this.props;
        _updatePassword( password1, password2);
    }

    render() {
        // const { errors } = this.state;
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
                                <b>Update</b> password
                            </h4>
                            
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.username}
                                    
                                    id="password1"
                                    type="password"
                                />
                                <label htmlFor="username">Mật khẩu cũ</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    
                                    id="password2"
                                    type="password"
                                />
                                <label htmlFor="password">Mật khẩu mới</label>
                            </div>
                            <ul>
                                {this.props.user.listErrors.map(error =>
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
                                    Xác nhận
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps= state => ({
    user: state.user
    
});

export default connect(mapStateToProps,{_updatePassword})(Update_Password);