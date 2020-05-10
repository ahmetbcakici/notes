import React, {useState} from 'react';
import {connect} from 'react-redux';

import {register} from '../redux/actions/user';
import VerificationCodeForm from './VerificationCodeForm';

function RegisterForm({register, loginState}) {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [verificationForm, setVerificationForm] = useState(false);

  const formSubmit = (e) => {
    e.preventDefault();
    register(emailAddress, password, username);
    setVerificationForm(true);
  };

  if (verificationForm) return <VerificationCodeForm credentials={{username,password}}/>;
  return (
    <div style={{textAlign: 'center'}}>
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
          type="text"
          placeholder="e-mail address"
          value={emailAddress}
          onChange={({target}) => setEmailAddress(target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="pass"
          value={password}
          onChange={({target}) => setPassword(target.value)}
        />
        <br />
        <input type="submit" value="REGISTER" />
      </form>
      {typeof loginState !== 'object' && <h1>{loginState}</h1>}
    </div>
  );
}

const mapStateToProps = (state) => ({
  loginState: state.userReducer,
});

const mapDispatchToProps = {
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
