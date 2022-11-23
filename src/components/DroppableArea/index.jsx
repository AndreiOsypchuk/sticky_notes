import React from "react";
import { RootContext } from "../../store/context";
export const DroppableArea = ({ actionWhenDropped, children, ...props }) => {
  const { dispatch } = React.useContext(RootContext);
  const handleDrop = (e) => {
    const noteId = e.dataTransfer.getData("data");
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
