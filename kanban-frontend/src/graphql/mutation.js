import { gql } from '@apollo/client';

export const CREATE_KANBAN_TICKET = gql`
mutation CreateKanbanTicket(
    $title: String!,
    $description: String!,
    $status: String!,
    $assignedTo: String!,
    $date: Date!
  ) {
    createTicket(
      title: $title,
      description: $description,
      status: $status,
      assignedTo: $assignedTo,
      date: $date
    ) {
      kanbanTicket {
        id
        title
        description
        status
        assignedTo
        date
      }
      error
    }
  }
  
`;



export const UPDATE_KANBAN_TICKET = gql`
  mutation UpdateKanbanTicket(
    $id: String!,
    $status: String,
    
  ) {
    updateTicket(
      id: $id,
      status: $status,
    ) {
      kanbanTicket {
        id
        title
        description
        status
        assignedTo
        date
   
      }
      error
    }
  }
`;


export const UPDATE_KANBAN_TICKET_All_PROP = gql`
  mutation UpdateKanbanTicket(
    $id: String!,
    $title: String,
    $description: String,
    $status: String,
    $assignedTo: String,
    $date: date
  ) {
    updateTicket(
      id: $id,
      title: $title,
      description: $description,
      status: $status,
      assignedTo: $assignedTo,
      date: $date
    ) {
      kanbanTicket {
        id
        title
        description
        status
        assignedTo
        date
        # Include other fields as needed
      }
      error
    }
  }
`;


export const DELETE_KANBAN_TICKET = gql`
mutation DeleteKanbanTicket($id: String!) {
    deleteTicket(id: $id) {
      success
    }
  }
`;

