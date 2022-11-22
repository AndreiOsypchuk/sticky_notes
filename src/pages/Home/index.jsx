import React from "react";
import { Navbar } from "../../components";
import { BiSearch, BiDotsHorizontalRounded } from "react-icons/bi";
import { RootContext } from "../../store/context";
import { Actions } from "../../store/actions";
import { v4 as uuid } from "uuid";
// how does data inside the note look like
// color, content, isInWorkspace

export const Home = () => {
  const { dispatch } = React.useContext(RootContext);

  const handleAdd = () => {
    dispatch({
      type: Actions.CREATE_NOTE,
      data: { id: uuid(), content: "", color: "default", isInWorkspace: false },
    });
  };

  return (
    <>
      <div className=" h-screen overflow-hidden">
        <Navbar />
        <div className=" h-[93.757%] w-full flex">
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
                />
                <BiSearch className="absolute -translate-x-1/2 right-0  text-slate-500/50" />
              </div>
            </div>

            <YourNotesList />
          </div>

          <DroppableArea
            className=" h-full flex w-4/5 gap-4 p-4"
            actionWhenDropped={Actions.PIN_NOTE}
          >
            <Wrokspace />
          </DroppableArea>
        </div>
      </div>
    </>
  );
};

const DroppableArea = ({ actionWhenDropped, children, ...props }) => {
  const { dispatch } = React.useContext(RootContext);
  const handleDrop = (e) => {
    const noteId = e.dataTransfer.getData("data");
    console.log(noteId);
    e.preventDefault();
    dispatch({
      type: actionWhenDropped,
      id: noteId,
    });
  };
  return (
    <div {...props} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      {children}
    </div>
  );
};

const Wrokspace = () => {
  const {
    state: { notes },
  } = React.useContext(RootContext);
  return (
    <>
      {notes.map((item) => {
        return (
          item.isInWorkspace && <NoteInWorkspace key={item.id} data={item} />
        );
      })}
    </>
  );
};

// add color picker

const NoteInWorkspace = ({ data }) => {
  const { dispatch } = React.useContext(RootContext);
  const [input, setInput] = React.useState("");
  React.useEffect(() => setInput(data.content), []);
  const handleChange = (e) => {
    setInput(() => e.target.value);
  };
  const handleDragStart = (e) => {
    e.dataTransfer.setData("data", data.id);
  };
  const handleContentSave = () => {
    dispatch({ type: Actions.EDIT_NOTE, data: input, id: data.id });
  };
  return (
    <div draggable onDragStart={handleDragStart} className="h-min">
      <div className="bg-red-400 p-4"></div>
      <textarea
        rows="6"
        cols="30"
        type="text"
        placeholder="New Note..."
        value={input}
        onChange={handleChange}
        onBlur={handleContentSave}
        className="bg-yellow-200 p-4 placeholder:text-sm placeholder:font-thin"
      />
    </div>
  );
};

const YourNotesList = () => {
  const {
    state: { notes },
  } = React.useContext(RootContext);
  return (
    <DroppableArea
      actionWhenDropped={Actions.UNPIN_NOTE}
      className="p-4 h-full pb-12"
    >
      {notes.map((item) => (
        <YourNote key={item.id} data={item} />
      ))}
    </DroppableArea>
  );
};

// add color bar

const YourNote = ({ data }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("data", data.id);
  };
  return (
    !data.isInWorkspace && (
      <div
        draggable
        onDragStart={handleDragStart}
        className="h-20 bg-yellow-200 w-52  mb-2  rounded-md"
      >
        <div className="bg-red-400 p-1 rounded-t-md"> </div>
        <div className="w-52 h-12 p-2 relative rounded-md">
          <BiDotsHorizontalRounded className="absolute right-1 top-0" />
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
