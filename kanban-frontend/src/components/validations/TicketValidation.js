import PropTypes from "prop-types";

export const ticketShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  assignedTo: PropTypes.string.isRequired,
};

export const kanbanColumnProps = {
  title: PropTypes.string.isRequired,
  droppableId: PropTypes.number.isRequired,
  onDragEnd: PropTypes.func.isRequired,
};
