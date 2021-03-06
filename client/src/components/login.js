import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect,logout,isAuthenticated,user,isLoading} = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if(!isAuthenticated){
    return <button className="btn btn-danger" style={{"margin":"5px"}} onClick={() => {
      loginWithRedirect() 
    }}>Log In</button>;
  }

  return( 
  <div>
  <img src={user.picture} alt={user.name} style={{"borderRadius":"50px","width":"40px","height":"40px","margin":"5px"}}/>
  <button className="btn btn-danger" style={{"margin":"5px"}} onClick={() =>{ logout({ returnTo: window.location.origin })}}> Log Out</button>
  </div>
  )

};

export default LoginButton;