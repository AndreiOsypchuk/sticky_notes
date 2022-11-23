import React from "react";
import {
  Navbar,
  Workspace,
  DroppableArea,
  YourNotesList,
} from "../../components";
import { BiSearch } from "react-icons/bi";
import { RootContext } from "../../store/context";
import { Actions } from "../../store/actions";
import { v4 as uuid } from "uuid";

export const Home = () => {
  const {
    dispatch,
    state: { notes },
  } = React.useContext(RootContext);
  const [searchInput, setSearchInput] = React.useState("");
  const handleAdd = () => {
    dispatch({
      type: Actions.CREATE_NOTE,
      data: { id: uuid(), content: "", color: "default", isInWorkspace: false },
    });
  };
  const filteredList = React.useMemo(
    () => notes.filter((n) => n.content.includes(searchInput)),
    [searchInput, notes]
  );
  const handleSearch = (e) => {
    setSearchInput(() => e.target.value);
  };

  return (
    <>
      <div className=" h-screen overflow-hidden">
        <Navbar />
        <div className=" h-[93.757%] w-full flex px-60">
          <div className=" bg-slate-100 flex flex-col h-full min-w-max max-w-xs px-4 relative overflow-y-auto">
            <div className=" sticky top-0 bg-slate-100">
              <h1 className="font-black text-slate-800 text-2xl py-4">
                All Your Notes
              </h1>
              <button onClick={handleAdd}>Add note</button>
              <div className="relative flex items-center shadow-lg rounded-full ">
                <input
                  placeholder="Search for notes"
                  className="rounded-md p-1 px-3 w-full pr-8 border border-slate-400 backdrop-blur-sm bg-white/30"
                  value={searchInput}
                  onChange={handleSearch}
                />
                <BiSearch className="absolute -translate-x-1/2 right-0  text-slate-500/50" />
              </div>
            </div>

            <YourNotesList filteredList={filteredList} />
          </div>

          <DroppableArea
            className=" h-full flex w-4/5 gap-4 p-4"
            actionWhenDropped={Actions.PIN_NOTE}
          >
            <Workspace />
          </DroppableArea>
        </div>
      </div>
    </>
  );
};
