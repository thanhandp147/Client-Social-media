import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _logout } from '../actions/user'
import { Link } from 'react-router-dom';
import { _updatePassword } from '../actions/user'
import { _updateInfo }from '../actions/user'

class Update_Info extends Component {
    constructor() {
        super();
        this.state = {
            birthday: '',
            phone: '',
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
        const { birthday, phone } = this.state;
        // const { _updatePassword, history }= this.props;
        // _updatePassword( password1, password2);
        const { _updateInfo, history }=this.props;
        _updateInfo(birthday,phone, history);
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
                                <b>Update</b> info
                            </h4>
                            
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.username}
                                    
                                    id="birthday"
                                    type="text"
                                />
                                <label htmlFor="username">Nhập ngày tháng năm sinh</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    
                                    id="phone"
                                    type="text"
                                />
                                <label htmlFor="password">Nhập số điện thoại</label>
                            </div>
                            {/* <ul>
                                {this.props.user.listErrors.map(error =>
                                    <li className="error__item" key={error}>{error}</li>
                                )}

                            </ul> */}
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

export default connect(mapStateToProps,{_updateInfo})(Update_Info);
