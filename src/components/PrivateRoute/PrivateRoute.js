import React, { useContext } from 'react';
import { Route, Redirect} from 'react-router-dom';
import { UseContext } from '../LogIn/Context';
//import { useAuth } from './AuthContext';

function PrivateRoute({ children, ...rest }) {
  const [logInUser, setLogInUser] = useContext(UseContext)

 
  return (
    <Route
      {...rest}
      render={({ location }) =>
        logInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;