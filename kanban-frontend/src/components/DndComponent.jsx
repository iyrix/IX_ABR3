import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useUpdateKanbanTicketMutation } from "./kanbanUtils";
import { Status } from "../constants";
import KanbanColumn from "./KanbanColumn";

function DndComponent() {
  const { updateKanbanTicket } = useUpdateKanbanTicketMutation();

  const onDragEnd = (result, droppableId, title) => {
    if (!result && title) return;
    updateKanbanTicket(result.id, title);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="overflow-x-auto">
        <div
          className="flex justify-center mx-auto space-x-8 "
          style={{
            width: "1280px",
          }}
        >
          {Status?.map(({ id, status }, index) => {
            return (
              <KanbanColumn
                key={index}
                title={status}
                droppableId={id}
                onDragEnd={onDragEnd}
              />
            );
          })}
        </div>
      </div>
    </DndProvider>
  );
}

export default DndComponent;
