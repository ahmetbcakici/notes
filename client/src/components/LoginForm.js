import React, {useState} from 'react';
import {connect} from 'react-redux';

import {login} from '../redux/actions/user';

function LoginForm({login, loginState}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const formSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return;
    login(username, password);
  };

  return (
    <div style={{textAlign: 'center'}}>
      {typeof loginState !== 'object' && <h1>{loginState}</h1>}
      <br />
      <form onSubmit={formSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={({target}) => setUsername(target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={({target}) => setPassword(target.value)}
        />
        <br />
        <input type="submit" value="LOGIN" />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loginState: state.userReducer,
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
