import React from "react";
import { Navbar } from "../../components";
import { BiSearch } from "react-icons/bi";
import { RootContext } from "../../store/context";
import { Actions } from "../../store/actions";
import { v4 as uuid } from "uuid";
// how does data inside the note look like
// color, content, isInWorkspace

export const Home = () => {
  const { dispatch, state } = React.useContext(RootContext);

  const handleAdd = () => {
    dispatch({
      type: Actions.CREATE_NOTE,
      data: { id: uuid(), content: "", color: "default", isInWorkspace: false },
    });
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

            <YourNotesList />
          </div>

          <DroppableArea
            className="bg-yellow-300 h-full flex w-4/5"
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
    <div draggable onDragStart={handleDragStart}>
      {/* <div>choose color</div> */}
      <textarea
        rows="4"
        cols="35"
        type="text"
        placeholder="New Note..."
        value={input}
        onChange={handleChange}
        onBlur={handleContentSave}
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
      className=" pt-4 pl-4 bg-red-600"
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
        className="h-12 bg-slate-400 text-ellipsis overflow-hidden w-48 mb-1"
      >
        {data.content.length ? data.content : "New Note"}
      </div>
    )
  );
};
