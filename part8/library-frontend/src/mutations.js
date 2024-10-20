import { gql } from "@apollo/client";
export const BOOK_FRAGMENTS = gql`
  fragment BookDetails on Book {
    author {
        name
      }
      genres
      _id
      published
      title
  }`
export const ADD_BOOK = gql`
  mutation Mutation($title: String!, $author: String!, $published: Int!) {
    addBook(title: $title, author: $author, published: $published) {
      author {
        name
      }
      genres
      _id
      published
      title
    }
  }
`;  
export const EDIT_YEAR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      bookCount
      born
      _id
      name
    }
  }
`;
export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_FRAGMENTS}`