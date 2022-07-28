import React from "react";
import { Navigate } from "react-router-dom";

const RequireLogin = ({ auth, children }) => {
    return auth !== undefined ? children : <Navigate to="/login" />;
};

export default RequireLogin;