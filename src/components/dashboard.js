import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _logout } from '../actions/user'
import { _updateAvatar } from '../actions/user'
import { Link } from 'react-router-dom';

class Dashboard extends Component {

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
        
        return (
            <div>
                <button onClick={() => this._handleLogout()}>LOG OUT</button>
                <hr />

                <strong>Thông tin:</strong>
                <br />

                <img src={`http://localhost:3000/get_avatar/${this.props.user.infoUser.url}`} alt="" />
                {/* <Link to='/update_avatar'>
                    <button>
                        Cập nhật ảnh đại diện
                    </button>
                </Link> */}
                <form method="post">
                    <input type="file" name="avatar" id="avatar"
                        onChange={e => this._handleChangeFile(e)}
                    />
                    <button name="submit" type="button"
                        onClick={e => this._handleSubmit(e)}
                    >
                        Submit
                </button>

                </form>
                <br />
                <strong>Họ tên: </strong><span>{this.props.user.username.fullname}</span>
                <br />
                <strong>Email: </strong><span>{this.props.user.username.email}</span>
                <br />
                <strong>Ngày sinh: </strong><span>{this.props.user.infoUser.birthday}</span>
                <br />
                <strong>Số điện thoại: </strong><span>{this.props.user.infoUser.phone}</span>
                <br />
                <Link to="/update_password" className="btn-flat waves-effect">
                    <button>Thay đổi mật khẩu</button>
                </Link>
                <br />
                <Link to="/update_info" className="btn-flat waves-effect">
                    <button>Cập nhật thông tin</button>
                </Link>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user



});
export default connect(mapStateToProps, { _logout, _updateAvatar })(Dashboard);