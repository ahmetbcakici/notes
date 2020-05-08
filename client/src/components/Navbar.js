import React from 'react';
import {connect} from 'react-redux';

function Navbar({user}) {
  return (
    <nav style={{textAlign: 'center'}}>
      <p>Navbar user:{user.username}</p>
      <a href='/' onClick={() => localStorage.removeItem('jwt')}>logout</a>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

export default connect(mapStateToProps)(Navbar);
