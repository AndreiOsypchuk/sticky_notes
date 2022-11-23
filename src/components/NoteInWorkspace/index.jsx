import React from "react";
import { RootContext } from "../../store/context";
import { Actions } from "../../store/actions";

export const NoteInWorkspace = ({ data }) => {
  const { dispatch } = React.useContext(RootContext);
  const [input, setInput] = React.useState("");
  const setContent = React.useCallback(() => setInput(() => data.content), []);
  //   React.useEffect(() => setInput(() => data.content), []);
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
    <div
      draggable
      onDragStart={handleDragStart}
      className="h-min"
      ref={setContent}
    >
      <div className="bg-slate-400 p-4"></div>
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
