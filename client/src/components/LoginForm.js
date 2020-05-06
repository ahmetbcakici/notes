import React, {useState} from 'react';
import {connect} from 'react-redux';

import {login} from '../redux/actions';

function LoginForm({login}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const formSubmit = (e) => {
    e.preventDefault();
    login({username, password});
  };

  return (
    <div style={{textAlign: 'center'}}>
      <form onSubmit={formSubmit}>
        <input
          type="text"
          value={username}
          onChange={({target}) => setUsername(target.value)}
        />
        <br />
        <input
          type="text"
          value={password}
          onChange={({target}) => setPassword(target.value)}
        />
        <br />
        <input type="submit" value="SUBMIT" />
      </form>
    </div>
  );
}

const mapDispatchToProps = {
  login,
};

export default connect(null, mapDispatchToProps)(LoginForm);
