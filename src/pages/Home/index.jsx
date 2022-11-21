import React from "react";
import { Navbar } from "../../components";
import { BiSearch } from "react-icons/bi";
import { RootContext } from "../../store/context";
import { Actions } from "../../store/actions";

// how does data inside the note look like
// color, content, isInWorkspace

export const Home = () => {
  const { dispatch, state } = React.useContext(RootContext);

  const handleAdd = () => {
    dispatch({
      type: Actions.CREATE_NOTE,
      data: { content: "", color: "default", isInWorkspace: false },
    });
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("data", JSON.stringify({ name: "asdf" }));
  };

  return (
    <>
      <div className="bg-red-700 h-screen overflow-hidden">
        <Navbar />
        <div className="bg-blue-400 h-[93.757%] w-full flex">
          <div className="bg-green-400 bg-white flex flex-col h-full max-w-xs px-4 relative overflow-y-auto">
            <div className=" sticky top-0 bg-white">
              <h1 className="font-black text-slate-800 text-2xl py-4">
                All Your Notes
              </h1>
              <button onClick={handleAdd}>Add note</button>
              <div
                style={{ bottom: `0px`, left: `0px` }}
                className="relative flex items-center shadow-lg rounded-full "
              >
                <input
                  placeholder="Search for notes"
                  className="rounded-md p-1 px-3 w-full pr-8 border border-slate-400 backdrop-blur-sm bg-white/30"
                />
                <BiSearch className="absolute -translate-x-1/2 right-0  text-slate-500/50" />
              </div>
            </div>
            <ul className=" pt-4 pl-4">
              {state.notes.map((item, index) => (
                <li
                  draggable
                  onDragStart={handleDragStart}
                  key={index}
                  className="h-24 bg-slate-400"
                >
                  New Note
                </li>
              ))}
            </ul>
          </div>

          <Wrokspace />
        </div>
      </div>
    </>
  );
};

// make note look something okay
const Note = () => {
  return (
    <div>
      <h1>note</h1>
    </div>
  );
};

// display as a grid or whatever
const Wrokspace = () => {
  const { state, dispatch } = React.useContext(RootContext);
  const handleDrop = (e) => {
    e.preventDefault();
    console.log(JSON.parse(e.dataTransfer.getData("data")));
  };
  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="bg-yellow-300 h-full flex w-4/5"
    >
      {state.notes.map((item, index) => {
        return item.isInWorkspace && item.content;
      })}
    </div>
  );
};

// notes on the left
const YourNotesList = () => {
  return null;
};
