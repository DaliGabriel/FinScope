import { gql } from "@apollo/client";

export const CREATE_LOG = gql`
  mutation CreateLog($action: String!, $details: String!, $userId: ID!) {
    createLog(action: $action, details: $details, userId: $userId) {
      action
      details
      id
      timestamp
      userId
    }
  }
`;
