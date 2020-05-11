import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {auth} from '../redux/actions/user';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import '../style/Main.css'

function Main({auth, user}) {
  const [isRegisterForm, setIsRegisterForm] = useState(true);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) return;

    auth(jwt);
  }, [auth]);

  if (user.username) return <Redirect to="/app" />;
  return (
    <div id="main">
      {isRegisterForm ? <RegisterForm /> : <LoginForm />}
      <br />
      <small onClick={() => setIsRegisterForm(!isRegisterForm)}>
        {isRegisterForm ? 'if you have account' : 'if you have no account'}
      </small>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

const mapDispatchToProps = {
  auth,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
