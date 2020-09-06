import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { AppState } from '../store';

const mapStateToProps = (state: AppState) => ({
    isAuthenticated: state.auth.isAuthenticated
})

const connector = connect(mapStateToProps)

interface ProtectedProps {
  exact?: boolean
  isAuthenticated: boolean | null
  path: string
  component: ComponentType<any>
}

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }: ProtectedProps) => {
  const history = useHistory();
  if(!isAuthenticated) {
    history.push('auth/login');
  }
  return (
    <Route render={rest => (
      <>
        <Component {...rest} />
      </>
    )} />
  );
}

export default connector(ProtectedRoute);