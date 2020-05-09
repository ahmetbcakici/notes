import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {auth} from '../redux/actions/user';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

function Main({auth, user}) {
  const [isRegisterForm, setIsRegisterForm] = useState(true);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) return;

    auth(jwt);
  }, [auth]);

  if (user.username) return <Redirect to="/app" />;
  return (
    <div style={{textAlign: 'center'}}>
      {isRegisterForm ? <RegisterForm /> : <LoginForm />}
      <br />
      <button onClick={() => setIsRegisterForm(!isRegisterForm)}>
        FORM CHANGE
      </button>
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