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
      <div className="w-full border border-slate-600/10 bg-slate-100">
        <nav className=" mx-auto py-2 px-8 lg:w-3/4 flex items-center justify-between ">
          <div className="flex items-center justify-between">
            <Logo className="h-6 w-6 mr-4" />
            <h1 className=" text-slate-600">Sticky_Notes</h1>
          </div>
          <button
            onClick={handleLogOut}
            className="transition ease-out duration-500 hover:bg-slate-300/50 rounded-full py-2 px-4 text-slate-600"
          >
            Log Out
          </button>
        </nav>
      </div>
    </>
  );
};
