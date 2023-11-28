import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useAppContext } from "./apicontext";
import CreateTicketForm from "./CreateTicketForm";
import { CREATE_KANBAN_TICKET } from "../graphql/mutation";

function Header() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [createKanbanTicket] = useMutation(CREATE_KANBAN_TICKET);
  const { toggle } = useAppContext();

  const submitForm = (values) => {
    const variables = {
      title: values.title,
      description: values.description,
      assignedTo: values.assignedTo,
      date: values.date,
      status: "backlog",
    };

    createKanbanTicket({
      variables,
    });
    
    toggle();
  };
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
          onClick={() => setIsFormOpen(true)}
        >
          Add Ticket
        </button>
      </div>
      <div>
        <h1 className="text-2xl font-bold">Kanban</h1>
      </div>

      <CreateTicketForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={submitForm}
      />
    </div>
  );
}

export default Header;
