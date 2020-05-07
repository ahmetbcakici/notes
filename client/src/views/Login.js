import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {auth} from '../redux/actions';
import LoginForm from '../components/LoginForm';

function Login({auth,user}) {

  useEffect(() => {
    console.log('hr');
    const jwt = localStorage.getItem('jwt');

    if (!jwt) return console.log('there is no token');

    auth(jwt);
  }, [auth]);

  if (user.username) return <Redirect to="/app" />;
  return <LoginForm />;
}

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

const mapDispatchToProps = {
  auth,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
