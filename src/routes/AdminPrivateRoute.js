import React from "react";
import { Route, Navigate } from "react-router-dom";

import Admin from "../pages/Admin/Admin.jsx";

function AdminPrivateRoute(...rest) {
  const user = localStorage.getItem("user");

  return (
    <Route
      {...rest}
      render={({ props, location }) => {
        user.role === "ADMIN" ? (
          <Admin {...props} />
        ) : (
          <Navigate to={{ pathname: "/", state: { from: location } }} />
        );
      }}
    />
  );
}

export default AdminPrivateRoute;
