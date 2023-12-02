import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      HOME
      <Link to={"/login"} replace>
        Login
      </Link>
      <Link to={"/test"}>test</Link>
    </div>
  );
};
