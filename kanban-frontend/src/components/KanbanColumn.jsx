import React, { useEffect, useState } from "react";
import client from "../graphql/apolloClient";
import Ticket from "./Ticket";
import { FiFilter } from "react-icons/fi";
import { useDrop } from "react-dnd";
import { GET_TICKETS_BY_STATUS } from "../graphql/query";
import { useAppContext } from "./apicontext";
import { kanbanColumnProps } from "./validations/TicketValidation";

const KanbanColumn = ({ title, droppableId, onDragEnd }) => {
  const { toggleState } = useAppContext();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortByDate, setSortByDate] = useState(false);

  const [, drop] = useDrop({
    accept: "CARD",
    drop: (item) => {
      onDragEnd(item, droppableId, title);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.query({
          query: GET_TICKETS_BY_STATUS,
          variables: { status: title },
          fetchPolicy: "no-cache",
        });

        let sortedTickets = [...result.data.ticketsByStatus];

        if (sortByDate) {
          sortedTickets.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
          });
        } else {
          sortedTickets.reverse();
        }

        setTickets(sortedTickets);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [title, sortByDate, onDragEnd, toggleState]);

  const columnHeight = tickets?.length === 1 ? 320 : tickets.length * 290;

  if (loading) {
    return (
      <div className="bg-red-200 p-4 w-full rounded-lg shadow-lg m-4">
        <p className="text-white font-bold">Loading:</p>
      </div>
    );
  }

  return (
    <div
      ref={drop}
      className="bg-gray-400 p-4 rounded-lg shadow-lg m-4 relative max-w-full mx-auto"
      style={{
        minHeight: "250px",
        height: `${columnHeight}px`,
        maxWidth: "280px",
        minWidth: "280px",
      }}
    >
      <div
        className=" flex justify-between bg-gray-600 p-1 w-full rounded-lg mx-auto"
        style={{ height: ` 40px` }}
      >
        <h2 className="text-xl font-bold mb-4 text-white">{title.charAt(0).toUpperCase() +  title.slice(1)}</h2>
        <button
          className="flex items-center text-white"
          onClick={() => setSortByDate(!sortByDate)}
        >
          <FiFilter className="mr-2" />
          {sortByDate ? "(Asc)" : "(Dsc)"}
        </button>
      </div>

      <div className="space-y-5">
        {tickets.length > 0 &&
          tickets?.map((tickets, index) => {
            return (
              <React.Fragment key={index}>
                <Ticket key={index} ticket={tickets} index={index} />
                {index < tickets?.length - 1 && (
                  <hr className="my-2 border-t border-gray-300" />
                )}
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

KanbanColumn.propTypes = kanbanColumnProps;

export default KanbanColumn;
