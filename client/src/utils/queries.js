import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      savedBooks {
        title
        bookId
        image
        authors
        description
      }
    }
  }
`