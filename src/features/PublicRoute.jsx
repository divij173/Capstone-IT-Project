import React from 'react';
import PropTypes from 'prop-types';
import { Route, Navigate } from 'react-router-dom';

// Page for public routing
const isLogin = () => {
  if (localStorage.getItem('user_token')) {
    return true;
  }

  return false;
}
const PublicRoute = ({ component: Component, restricted, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      isLogin() && restricted
        ? <Navigate to='/' />
        : <Component {...props} />
    )}
  />
);

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  restricted: PropTypes.bool.isRequired,
};

export default PublicRoute;
