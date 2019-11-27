import React, { Component } from "react";


import { Route, Link } from "react-router-dom";
import '../css/uploadStatus.css'
import { _createPost } from '../actions/user'
import { connect } from 'react-redux';
import { _deletePost } from '../actions/user'
let uirGetImageHeroku = 'http://localhost:3000/get_avatar/';


class Post_Layout extends Component {

    state = {
        image: null,
        content: '',
        hashtag: '',
    }
    _onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        // console.log(e.target.id);


    }

    _handleSubmit = () => {
        // console.log(this.state.image);
        // console.log(this.state.content);
        // console.log(this.state);
        let image = this.state.image;
        let content = this.state.content;
        let hashtag = this.state.hashtag


        const { _createPost } = this.props
        _createPost(image, content, hashtag)



    }

    _handleChangeFile = e => {
        this.setState({
            image: e.target.files[0]
        })
    }

    _handleDeletePost = (_idPost) => {


        const { _deletePost } = this.props;
        _deletePost(_idPost)
    }

    render() {
        
        // let uirGetImageHeroku = 'https://server-project-1.herokuapp.com/get_avatar/'
        // let { path } = this.props
        // console.log({ path });
        return (
            <>
                <div className="card shadow-sm rounded">
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs" >
                            <li className="nav-item">
                                <span className="fas  nav-link active">Tạo bài viết</span>
                            </li>
                        </ul>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="tab-content">
                                <div className="d-flex flex-row tab-pane fade show active ">
                                    <div className="avatar">avatar</div>
                                    <div className="form-group">
                                        <textarea
                                            onChange={this._onChange}
                                            value={this.state.content}
                                            id="content"
                                            className="form-control" rows="4" cols="100" placeholder="Bạn đang nghĩ gì?"></textarea>
                                    </div>
                                </div>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm">
                                            <div className="d-flex flex-row">
                                                <button onClick={() => { this.upload.click() }} type="button" className="fas fa-image status-button" title="Chọn ảnh">Ảnh/Images</button>
                                                <input ref={(ref) => this.upload = ref} style={{ display: "none" }} type="file" name="avatar" id="avatar"
                                                    onChange={e => this._handleChangeFile(e)}
                                                />
                                                <input
                                                    onChange={this._onChange}
                                                    value={this.state.hashtag}
                                                    id="hashtag"
                                                    type="text" className="form-control status-input" placeholder="#Hashtags" />
                                            </div>
                                        </div>
                                        <div className="col-sm">
                                            <div className="d-flex flex-row-reverse">
                                                <button className="btn btn-danger btn-sm" style={{ backgroundColor: "#26A69A", border: "none" }} onClick={e => this._handleSubmit(e)} name="submit" type="button" >Đăng</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                
                
                {/* Hien tat ca bai dang */}

                {
                    this.props.user.listPosts.length > 0 &&
                    this.props.user.listPosts.map(item => {
                        return (
                            <div>
                                <div className="card card-post shadow-sm">
                                    <div className="row">
                                        <div className="col-sm">
                                            <div className="row">
                                                <div style={{ width: 50, height: 50 }} className=" avatar d-flex alignItemsCenter">
                                                    {item.author.avatar != null &&
                                                        <img style={{ width: 50, height: 50, borderRadius:25 }} src={`${uirGetImageHeroku}${item.author.avatar}`} alt="" />

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

            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    post: state.post

});

export default connect(mapStateToProps, { _createPost, _deletePost })(Post_Layout)
// _createPost
