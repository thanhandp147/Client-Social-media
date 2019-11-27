import React, { Component } from "react";


import { Route, Link } from "react-router-dom";
import '../css/uploadStatus.css'

import { connect } from 'react-redux';
import { _deletePost } from '../actions/user'
import { Alert } from "react-bootstrap";


let uirGetImageHeroku = 'http://localhost:3000/get_avatar/';
class ListPostsInUserProfile extends Component {


    
    render() {
        return (
            <>
                <div className='card card-user-profile user-profile-friend container'>
                    
                    {
                        this.props.user.listPosts.length > 0 &&
                        this.props.user.listPosts.map(item => {
                            // item.author.username == this.props.user.username.usernameServer &&
                            return(
                                item.author.username == this.props.user.username.usernameServer &&
                                <div>
                                    <div className="card shadow-sm">
                                        <div className="row">
                                            <div className="col-sm">
                                                <div className="row">
                                                    <div style={{ width: 50, height: 50 }} className=" avatar d-flex alignItemsCenter">
                                                        {item.author.avatar != null &&
                                                            <img style={{ width: 50, height: 50, borderRadius: 25 }} src={`${uirGetImageHeroku}${item.author.avatar}`} alt="" />

                                                        }
                                                    </div>
                                                    <Link className="status-editing">{item.author.fullname}</Link>

                                                </div>
                                                <div className="wrap">
                                                    <Link to='/#'>
                                                        <div
                                                            style={{ height: '50' }}
                                                            className="badge badge-pill badge-info">#{item.hashtag}</div>
                                                    </Link>

                                                </div>
                                            </div>
                                            <div className="col-sm d-flex align-items-center justify-content-end">
                                                {
                                                    this.props.user.username.usernameServer == item.author.username &&

                                                    <>
                                                        <Link to={`/edit-post/${item._id}`}><button className="status-button" style={{ margin: "0" }}>Edit post</button></Link>
                                                        <button onClick={() => this._handleDeletePost(item._id)} className="status-button" style={{ margin: "0" }}>Delte post</button>
                                                    </>

                                                }

                                            </div>
                                        </div>
                                        <div
                                            className="wrap-content">
                                            <span className="content">{item.content}</span>
                                            <div
                                                className="palette d-flex justify-content-center">
                                                {/* <div className="d-flex justify-content-center "> */}
                                                <img
                                                    style={{ maxWidth: '100%' }}
                                                    src={`${uirGetImageHeroku}${item.images[0]}`} />

                                                {/* </div> */}
                                            </div>
                                            <div className="row">
                                                <div className="col-sm d-flex justify-content-center">
                                                    <button className="fas fa-heart status-button"></button>
                                                </div>
                                                <div className="col-sm d-flex justify-content-center">
                                                    <button className="fas status-button">Bình luận</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        );
    }
}
const mapStateToProps = state => ({
    user: state.user,
    post: state.post
})

export default connect(mapStateToProps, null)(ListPostsInUserProfile);