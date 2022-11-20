import React from "react";
import { RootContext } from "../../store/context";
import { ReactComponent as Logo } from "../../Logo.svg";
import { Actions } from "../../store/actions";
export const Navbar = () => {
  const { dispatch } = React.useContext(RootContext);
  const handleLogOut = () => {
    dispatch({ type: Actions.LOG_OUT });
  };
  return (
    <>
      <nav className="flex items-center justify-between">
        <Logo />
        <button onClick={handleLogOut}>Log Out</button>
      </nav>
    </>
  );
};
