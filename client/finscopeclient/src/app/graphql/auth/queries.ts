import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      ... on UserSuccess {
        __typename
        currentUser {
          createdAt
          email
          id
          name
          role
        }
      }
      ... on AuthError {
        __typename
        code
        message
      }
    }
  }
`;
