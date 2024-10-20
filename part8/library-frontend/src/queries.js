import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      _id
      bookCount
      born
      name
    }
  }
`;
export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      _id
      author {
        name
      }
      genres
      published
      title
    }
  }
`;
export const GET_GENRES = gql`
  query Query {
    genres
  }
`;
