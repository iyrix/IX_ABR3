import { useMutation } from "@apollo/client";
import { UPDATE_KANBAN_TICKET } from "../graphql/mutation";

export const useUpdateKanbanTicketMutation = () => {
  const [updateKanbanTicketMutation] = useMutation(UPDATE_KANBAN_TICKET);

  const updateKanbanTicket = async (id, status) => {
    const result = await updateKanbanTicketMutation({
      variables: {
        id: id,
        status: status,
      },
    });

    return result;
  };
  return { updateKanbanTicket };
};
