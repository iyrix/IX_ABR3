import { gql } from "@apollo/client";

export const GET_All_TICKETS = gql`
  query {
    allTickets {
      id
      title
      status
      assignedTo
      status
      description
      date
    }
  }
`;

export const GET_TICKET_BY_ID = gql`
  query GetTicketById($id: Int!) {
    ticket(id: $id) {
      id
      title
      status
      assignedTo
      status
      description
      date
    }
  }
`;

export const GET_TICKETS_BY_STATUS = gql`
  query GetTicketsByStatus($status: String!) {
    ticketsByStatus(status: $status) {
      id
      title
      status
      assignedTo
      status
      description
      date
    }
  }
`;
