import React, { Fragment } from "react";

const Login = ({ setAuth }) => {
  const handleAuthentication = () => {
    setAuth(true);
  };

  return (
    <Fragment>
      <h1>Login</h1>
      <button onClick={handleAuthentication}>Authenticate</button>
    </Fragment>
  );
};

export default Login;
