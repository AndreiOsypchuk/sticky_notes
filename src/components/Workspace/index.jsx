import React from "react";
import { NoteInWorkspace } from "../NoteInWorkspace";
import { RootContext } from "../../store/context";
export const Workspace = () => {
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
