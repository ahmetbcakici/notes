import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {auth} from '../redux/actions';
import LoginForm from '../components/LoginForm';

function Login({user}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) return console.log('there is no token');

    setIsLoggedIn(true);
    auth(jwt);
  }, [user]);

  if (isLoggedIn) return <Redirect to="/app" />;
  return <LoginForm />;
}

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

export default connect(mapStateToProps)(Login);
