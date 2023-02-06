import React, { Component, useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";
import { useAuth } from "./context/AuthContext";

// export type ProtectedRouteProps = {
//   //isAuthenticated: boolean;
//   authenticationPath: string;
//   outlet: JSX.Element;
// };

// const PrivateRoute = ({authenticationPath, outlet}: ProtectedRouteProps) => {
//   const {currentUser}: any = useContext(AuthContext);
//   //return (
//   console.log("currentUser", currentUser, authenticationPath)
//   if (currentUser) {
//     return outlet;
//   } else {
//     return <Navigate to={{pathname: authenticationPath}} />
//   }


    // !!currentUser ? (
    //   <Route path={props.path} element={props.element}/>
    // ) : (
    //   <Navigate to={"/login"} />
    // )




    // <Route
    //   {...rest}
    //   render={(routeProps: JSX.IntrinsicAttributes) =>
    //     !!currentUser ? (
    //       <RouteComponent {...routeProps} />
    //     ) : (
    //       <Navigate to={"/login"} />
    //     )
    //   }
    // />
  //);
// };


const PrivateRoute = ({children}: any) => {
  const {user} = useAuth();
  return (
    user ? children : <Navigate to="/login" />
  );
}


export default PrivateRoute