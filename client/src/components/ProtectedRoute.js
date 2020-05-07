import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

function ProtectedRoute({component: Component,user, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.username) return <Component {...props} />;
        else return <Redirect to='/' />;
      }}
    />
  );
}

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

export default connect(mapStateToProps)(ProtectedRoute);
