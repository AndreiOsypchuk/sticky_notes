import React from "react";
import { BiTrashAlt } from "react-icons/bi";
import { RootContext } from "../../store/context";
import { Actions } from "../../store/actions";
export const YourNote = ({ data }) => {
  const { dispatch } = React.useContext(RootContext);
  const handleDragStart = (e) => {
    e.dataTransfer.setData("data", data.id);
  };
  const handleDelete = (e) => {
    dispatch({ type: Actions.DELETE_NOTE, id: data.id });
  };
  return (
    !data.isInWorkspace && (
      <div
        draggable
        onDragStart={handleDragStart}
        className="h-20 bg-yellow-200 w-52  mb-2  rounded-md"
      >
        <div className="bg-slate-400 p-1 rounded-t-md"> </div>
        <div className="w-52 h-12 p-2 relative rounded-md">
          <button onClick={handleDelete} className="absolute right-1 top-0">
            <BiTrashAlt className=" h-4 text-slate-500" />
          </button>
          {data.content.length ? (
            <p className=" text-xs text-slate-900 pt-1 h-12 truncate overflow-hidden">
              {data.content}
            </p>
          ) : (
            <p className="text-xs text-slate-500 pt-1 font-thin">New Note...</p>
          )}
        </div>
      </div>
    )
  );
};
