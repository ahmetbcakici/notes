import React, {useState} from 'react';
import {connect} from 'react-redux';

import {confirmEmail} from '../redux/actions/user';
import {login} from '../redux/actions/user';

function VerificationCodeForm({credentials, confirmEmail, login, loginState}) {
  const [verificationCode, setVerificationCode] = useState('');

  const formSubmit = async (e) => {
    e.preventDefault();
    if (!verificationCode) return;
    const {username, password} = credentials;
    const token = localStorage.getItem('email_code');
    await confirmEmail(verificationCode, token);
    login(username, password);
  };

  return (
    <div>
      <br />
      <form onSubmit={formSubmit}>
        <input
          type="text"
          placeholder="verification code"
          value={verificationCode}
          onChange={({target}) => setVerificationCode(target.value)}
        />
        <br />
        <input type="submit" value="CONFIRM" />
      </form>
      {typeof loginState !== 'object' && <h1>{loginState}</h1>}
      <br />
      <br />
    </div>
  );
}

const mapStateToProps = (state) => ({
  loginState: state.userReducer,
});

const mapDispatchToProps = {
  confirmEmail,
  login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerificationCodeForm);
