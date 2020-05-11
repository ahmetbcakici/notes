import React from 'react';
import {connect} from 'react-redux';

import '../style/Navbar.css';

function Navbar({user}) {
  return (
    <nav style={{textAlign: 'center'}}>
      <p>{user.username}</p>
      <a href="/" onClick={() => localStorage.removeItem('jwt')}>
        logout
      </a>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

export default connect(mapStateToProps)(Navbar);
