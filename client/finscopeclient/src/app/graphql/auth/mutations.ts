import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ... on LoginSuccess {
        __typename
        authPayload {
          accessToken
          user {
            createdAt
            email
            id
            role
            name
          }
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

export const REGISTER = gql`
  mutation Register($email: String!, $password: String!, $name: String!) {
    register(email: $email, password: $password, name: $name) {
      ... on RegisterSuccess {
        __typename
        user {
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


