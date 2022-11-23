import React from "react";
import { Actions } from "../../store/actions";
import { DroppableArea, YourNote } from "../";
export const YourNotesList = ({ filteredList }) => {
  return (
    <DroppableArea
      actionWhenDropped={Actions.UNPIN_NOTE}
      className="p-4 h-full pb-12"
    >
      {filteredList.map((item) => (
        <YourNote key={item.id} data={item} />
      ))}
    </DroppableArea>
  );
};
