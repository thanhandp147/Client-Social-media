import React, { Component } from 'react';
import './App.css';
// import { BrowserRouter as Router, Route } from "react-router-dom";
// // import Navbar from '../src/components/layout/Navbar';
// import { Provider } from "react-redux";

import { Link } from 'react-router-dom';
import { PublicRoute, ProtectedRoute } from './route';
// import Landing from '../src/components/layout/Landing';
// // import Navbar from '../src/components/layout/Navbar';
// import Register from './components/auth/Register';
// import Login from './components/auth/Login';
// import Dashboard from './components/layout/Dashboard';
// import './css/background_home.css';
import Landing from './components/landing';
import Dashboard from './components/dashboard';
import Login from './components/login';
import Register from './components/register';
import Update_Password from './components/update_password.js';
import Update_Info from './components/update_info';
import Update_Avatar from './components/update_avatar';
import Home from './components/Home';
import editPost from './components/editPost';
import { Route } from 'react-router'
import UserProfile from './components/UserProfile';
import UserFriend from './components/UserFriend';
import {connect} from 'react-redux'
import { _sendTokenAfterF5} from './actions/configSocket'
import './App.css';
// Import ReactTrap



class App extends Component {

  componentDidMount(){
    const {_sendTokenAfterF5}=this.props

    let token=localStorage.getItem('token')
    if(token){
      _sendTokenAfterF5(token)
    }
  }
  
  render() {

    return (
      <>
        <PublicRoute path={'/landing'} component={Landing} />
        <PublicRoute path={'/register'} component={Register} />
        <PublicRoute path={'/login'} component={Login} />
        <ProtectedRoute path={'/update_password'} component={Update_Password} />
        <ProtectedRoute path={'/update_avatar'} component={Update_Avatar} />
        <ProtectedRoute path={'/update_info'} component={Update_Info} />
        <ProtectedRoute exact path={'/'} component={Home} />
        <PublicRoute path={'/edit-post/:id'} component={editPost} />
        <ProtectedRoute path={'/user-profile'} component={UserProfile} />
        {/* <Route path='/edit-post/:id' exact component={editPost} /> */}
      </>
    );
  }
}




// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <div id="background">

//           <Route exact path="/" component={Landing} />
//           <Route exact path="/register" component={Register} />
//           <Route exact path="/login" component={Login} />
//         </div>
//       </div>
//     </Router>
//   );
// }
const mapStateToProps= state=>({
  user: state.user,
  post: state.post
})
export default connect(mapStateToProps,{_sendTokenAfterF5}) (App);
